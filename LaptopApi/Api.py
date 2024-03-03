from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

mongo_collection = None

def get_mongo_collection():
    global mongo_collection
    if mongo_collection is None:
        mongo_client = MongoClient("mongodb://192.168.1.8:27017")
        database = mongo_client["Laptops"]
        mongo_collection = database["ActiveLaptops"]
    return mongo_collection


@app.route("/laptops/<int:start_index>/<int:increment>/")
def get_cities(start_index, increment):
    db_collection = get_mongo_collection()

    try:
        query = {"Index": {"$gte": start_index, "$lt": start_index + increment}}
        projection = {
            "_id": 0,
            "name": 1,
            "original_price": 1,
            "discounted_price": 1,
            "absolute_savings": 1, 
            "relative_savings": 1,
            "url": 1,
            "shop": 1,
            "images": 1,
            "brand": 1
        }
        results = list(db_collection.find(query, projection))
        return jsonify(results)
    except Exception as e:
        return str(e)