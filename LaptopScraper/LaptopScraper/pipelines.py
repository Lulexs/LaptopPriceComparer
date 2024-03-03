from LaptopScraper.items import LaptopItem

class CleaningPipeline:
    def process_item(self, item: LaptopItem, spider):
        if item.get('original_price') is not None and item.get('discounted_price') is not None:
            item['original_price'] = int(item['original_price'])
            item['discounted_price'] = int(item['discounted_price'])
            item['absolute_savings'] = item['original_price'] - item['discounted_price']
            item['relative_savings'] = round(item['absolute_savings'] / item['original_price'], 2)
        else:
            item['original_price'] = int(item['discounted_price'])
            item['discounted_price'] = None
            item['absolute_savings'] = 0
            item['relative_savings'] = 0

        if item.get('image_urls') != None:
            del item['image_urls']
            item['images'] = item['images'][0].get('path')
        else:
            item['images'] = None

        return item


from scrapy.pipelines.images import ImagesPipeline
class CustomImagesPipeline(ImagesPipeline):
    def file_path(self, request, response=None, info=None, *, item=None):
        return f'{item.get("shop")}/{item.get("name").replace(" ", "").replace("/", "")}.jpg'


from pymongo import MongoClient
class PersistancePipeline:

    def __init__(self):
        self.client = MongoClient("mongodb://192.168.1.8/27017")
        self.database = self.client.Laptops
        self.collection = self.database.NewLaptops

    def process_item(self, item, spider):
        self.collection.insert_one(dict(item))
        return item

    def close_spider(self, spider):
        self.client.close()
