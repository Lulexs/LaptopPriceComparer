import scrapy
from scrapy.http import TextResponse
from LaptopScraper.items import LaptopItem
from scrapy.loader import ItemLoader


class TehnomediaSpider(scrapy.Spider):
    name = 'TehnomediaSpider'

    start_urls = ['https://www.tehnomedia.rs/it-uredjaji/laptop']   

    def parse(self, response: TextResponse):
        links = response.css('.product-link a::attr(href)').getall()[0:11]
        for link in links:
            yield scrapy.Request(link, self.parse_laptop_page)
        # yield from response.follow_all('.product-link a::attr(href)', callback=self.parse_laptop_page)
        # yield from response.follow_all('.page-link a::attr(href)', callback=self.parse)

    def parse_laptop_page(self, response: TextResponse):
        l = ItemLoader(item=LaptopItem(), selector=response)

        l.add_css('name', 'h1')
        l.add_css('brand', '.product-brand')
        l.add_css('original_price', 'div.price del')
        l.add_css('discounted_price', 'div.price span strong')
        tabel_items = response.css('.product-additional-info dl dd::text').getall()
        
        l.add_value('screen_diagonal', tabel_items[1])
        l.add_value('ram', tabel_items[3])
        l.add_value('ssd_hdd', tabel_items[4])

        for entry in response.css('.accordion-scroll::text').getall():
            if 'rafi' in entry:
                l.add_value('gpu', entry[entry.find(':') + 1:])
                break
            elif 'cesor' in entry or 'cpu' in entry:
                l.add_value('cpu', entry[entry.find(':') + 1:])
        
        l.add_value('shop', 'Tehnomedia')
        l.add_value('url', response.url)
        l.add_value('image_urls', response.css('img[src*="www.tehnomedia.rs/image/"]::attr(src)').get())


        yield l.load_item()
        