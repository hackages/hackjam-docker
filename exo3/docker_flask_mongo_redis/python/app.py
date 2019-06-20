#!/usr/bin/env python
# -*- coding: utf-8 -*-
import socket
from flask import Flask, render_template, url_for, request, redirect
from pymongo import MongoClient
from redis import Redis

#connection to redis
r = Redis(host='redis', port=6379)
app = Flask(__name__)
#connection to mongodb
m = MongoClient('mongo', 27017)
db = m.tododb
r.set('rhits','0')
r.set('mhits','0')

@app.route('/')
def todo():
    #getting all the documents from dbs mongodb in the tododb collection
    _items = db.tododb.find()
    items = [item for item in _items]
    
    #getting the IP of the node running the app
    hostname = socket.gethostname()
    hostip = socket.gethostbyname(hostname)
    
    #getting the number of calls in redis
    num_redis = r.get('rhits')
    num_mongo = r.get('mhits')
    #and making it prettier for printing
    num_redis=str(num_redis)
    num_mongo=str(num_mongo)
    num_redis = num_redis[2:-1]
    num_mongo = num_mongo[2:-1]
    
    #getting the actual value that are in redis
    cache = []
    #making it prettier too
    for key in r.scan()[1]:
        key = str(key)
        key = key[2:-1]
        cache.append(key)
        
    cache.remove('mhits')
    cache.remove('rhits')

    #returning those value to the main page called templates/todo.html
    return render_template('todo.html', items=items, hostip=hostip, num_redis=num_redis, num_mongo=num_mongo, cache=cache)

#method to look if a value is available
@app.route('/search', methods=['POST'])
def get():
    #receive the key from the form
    key = request.form['key']
   
    #check to see if the key is already in redis
    if r.exists(key) == 1:
        items = r.get(key)
        r.incr('rhits')
    #if not check if it exist in the mongodb and add it to redis for later search
    else:
        if db.tododb.find({'name' : key}).count()>0:
            r.incr('mhits')
            for _items in db.tododb.find({'name' : key}):
                items_name = _items['name']
                items_desc = _items['description']
            #adding the key and value in redis + adding an expiering time before removing the data
            r.setnx(items_name, items_desc)
            r.expire(items_name, 60)
        #data does not exist
        else:
            items = "Nothing"
    return redirect(url_for('todo'))

#add the data to the mongodb through the form
@app.route('/new', methods=['POST'])
def new():
    item_doc = {
        'name': request.form['name'],
        'description': request.form['description']
    }
    db.tododb.insert_one(item_doc)
    return redirect(url_for('todo'))

#clean all the data 
@app.route('/clean', methods=['POST'])
def clean():
    db.tododb.delete_many({})
    r.set('rhits','0')
    r.set('mhits','0')
    return redirect(url_for('todo'))

#start the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
