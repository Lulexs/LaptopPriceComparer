BOT_NAME = "LaptopScraper"

SPIDER_MODULES = ["LaptopScraper.spiders"]
NEWSPIDER_MODULE = "LaptopScraper.spiders"

ROBOTSTXT_OBEY = True

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0"

DUPEFILTER_CLASS = 'scrapy.dupefilters.RFPDupeFilter'

LOG_LEVEL="INFO"

DOWNLOAD_DELAY = 2
CONCURRENT_REQUESTS_PER_DOMAIN = 1

REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
FEED_FORMAT = "json"
FEED_URI = "data"

ITEM_PIPELINES = {
    "LaptopScraper.pipelines.CleaningPipeline": 350,
    "LaptopScraper.pipelines.CustomImagesPipeline": 300,
    "LaptopScraper.pipelines.PersistancePipeline": 400
}

IMAGES_STORE = "/home/lule/LaptopScraping/LaptopScraper/Images/"

DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.ScrapyPlaywrightDownloadHandler",
}