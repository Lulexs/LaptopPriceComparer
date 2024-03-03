import scrapy
import logging
from scrapy.http import TextResponse
from scrapy_playwright.page import PageMethod
from scrapy.selector import Selector
from LaptopScraper.items import LaptopItem
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose


class GigatronSpider(scrapy.Spider):
    name = 'GigatronSpider'
    
    def start_requests(self):
        yield scrapy.Request(
            url='https://gigatron.rs/prenosni-racunari/laptop-racunari',
            callback=self.parse,
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', '.item')
                ]
            ))

    async def parse(self, response: TextResponse):
        page = response.meta['playwright_page']
        last_item_count = 0
        while last_item_count < 10:
            current_item_count = len(await page.query_selector_all('.item'))
            if current_item_count == last_item_count:
                break
            last_item_count = current_item_count
            await page.evaluate('window.scrollBy(0, document.body.scrollHeight)')
            await page.wait_for_timeout(2000)
            logging.info(f'Scrolled, current_item_count: {current_item_count}')

        items = Selector(text=await page.content())
        for item in items.css('.item')[0:11]:
            next_laptop_url = item.css('a[itemprop="url"]::attr(href)').get()
            yield scrapy.Request(response.urljoin(next_laptop_url),
                                 callback=self.parse_laptop_page,
                                 meta=dict(
                                     playwright=True
                                 ))

    def parse_laptop_page(self, response: TextResponse):
        l = ItemLoader(item=LaptopItem(), selector=response)

        l.add_css('name', 'h1[itemprop="name"]')
        l.add_css('brand', '.title-data span:nth-child(3)')
        l.add_css('original_price', 'div.ppra_mp-price')
        l.add_css('discounted_price', 'span.ppra_price-number')
        tabel_items = response.css('ul.summary li span:nth-child(2)')
        laptop_attrs = ['cpu', 'screen_diagonal', 'gpu', 'ram', 'ssd_hdd']
        for i, attr in enumerate(laptop_attrs):
            if tabel_items[i + 1].css('::text').get():
                l.add_value(attr, tabel_items[i + 1].css('::text').get())
            else:
                l.add_value(attr, tabel_items[i + 1].css(':first-child::text').get())

        l.add_value('shop', 'Gigatron')
        l.add_value('url', response.url)
        l.add_value('image_urls', response.css('img[src*="/products/large/"]::attr(src)').get())

        yield l.load_item()
