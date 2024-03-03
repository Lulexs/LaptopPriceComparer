from scrapy import Item, Field
from itemloaders.processors import TakeFirst, MapCompose
from w3lib.html import remove_tags
from LaptopScraper.utils import clear_junk, extract_price, remove_unicode_00a0


class LaptopItem(Item):
    name = Field(
        input_processor=MapCompose(
            remove_tags,
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    brand = Field(
        input_processor=MapCompose(
            remove_tags,
            clear_junk,
            remove_unicode_00a0,
            lambda s: s.lower().capitalize()
        ),
        output_processor=TakeFirst()
    )
    original_price = Field(
        input_processor=MapCompose(
            remove_tags,
            clear_junk,
            extract_price,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    discounted_price = Field(
        input_processor=MapCompose(
            remove_tags,
            clear_junk,
            extract_price,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    absolute_savings = Field()
    relative_savings = Field()

    cpu = Field(
        input_processor=MapCompose(
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    gpu = Field(
        input_processor=MapCompose(
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    ssd_hdd = Field(
        input_processor=MapCompose(
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    screen_diagonal = Field(
        input_processor=MapCompose(
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )
    ram = Field(
        input_processor=MapCompose(
            clear_junk,
            remove_unicode_00a0
        ),
        output_processor=TakeFirst()
    )

    image_urls = Field()
    images = Field()

    url = Field(output_processor=TakeFirst())
    shop = Field(output_processor=TakeFirst())
