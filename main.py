import os
from pymongo import MongoClient
import subprocess

spider_names = [
    "TehnomanijaSpider",
    "GigatronSpider",
    "TehnomediaSpider"
]

scrapy_project = '/home/lule/LaptopScraping/LaptopScraper'

client = MongoClient('mongodb://192.168.1.8:27017/')
db = client['Laptops']
collection_new = db['NewLaptops']
collection_active = db['ActiveLaptops']

collection_new.delete_many({})

for spider_name in spider_names:
    pid = os.fork()
    
    if pid == 0:
        os.chdir(scrapy_project)
        os.execl('/home/lule/LaptopScraping/venv/bin/scrapy', 'scrapy', 'crawl', spider_name, '-o', 'data.jsonl')
    else:
        _, status = os.waitpid(pid, 0)
        print(f"Error: Process {pid} exited with status {os.WEXITSTATUS(status)}")

index = 0
for document in collection_new.find():
    collection_new.update_one({"_id": document["_id"]}, {"$set": {"Index": index}})
    index += 1

collection_active.delete_many({})
collection_active.insert_many(collection_new.find())



shell_script_path = '/home/lule/LaptopScraping/copy_files.sh'
subprocess.run(['bash', shell_script_path])
