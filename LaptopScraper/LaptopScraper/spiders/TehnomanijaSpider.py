import scrapy
import logging
from scrapy.http import TextResponse
from scrapy_playwright.page import PageMethod
from scrapy.selector import Selector
from LaptopScraper.items import LaptopItem
from scrapy.loader import ItemLoader


class TehnomanijaSpider(scrapy.Spider):
    name = "TehnomanijaSpider"

    def start_requests(self):
        yield scrapy.Request(
            url='https://www.tehnomanija.rs/it-gaming/laptopovi',
            callback=self.parse,
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[
                    PageMethod('wait_for_selector', '.product-item-link')
                ]
            ))

    async def parse(self, response: TextResponse):
        page = response.meta['playwright_page']
        last_item_count = 0
        while last_item_count < 10:
            current_item_count = len(await page.query_selector_all('.product-item-link'))
            if current_item_count == last_item_count:
                break
            last_item_count = current_item_count
            await page.evaluate('window.scrollBy(0, document.body.scrollHeight)')
            await page.wait_for_timeout(2000)
            logging.info(f'Scrolled, current_item_count: {current_item_count}')

        items = Selector(text=await page.content())
        for item in items.css('.product-item-link')[0:11]:
            next_laptop_url = item.css('::attr(href)').get()
            yield scrapy.Request(response.urljoin(next_laptop_url),
                                 callback=self.parse_laptop_page,
                                 meta=dict(
                                     playwright=True
                                 ))

    def parse_laptop_page(self, response: TextResponse):
        l = ItemLoader(item=LaptopItem(), selector=response)

        l.add_css('name', 'h1.page-title')
        title = response.css('.base::text').get()
        l.add_value('brand', title[:title.find(' ')])
        l.add_css('original_price', '.old-price')
        l.add_css('discounted_price', '.special-price')
        tabel_items = response.css('.value ul li')

        laptop_attrs = ['screen_diagonal', 'cpu', 'ram', 'ssd_hdd', 'gpu']
        for i, attr in enumerate(laptop_attrs):
            l.add_value(attr, tabel_items[i].css('::text').get()[tabel_items[i].css('::text').get().find(':') + 1:])

        l.add_value('shop', 'Tehnomanija')
        l.add_value('url', response.url)
        l.add_value('image_urls', response.css('img[src*="/media/catalog/product"]::attr(src)').get())

        yield l.load_item()
