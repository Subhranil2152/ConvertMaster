from flask import Flask, request, jsonify
from lru_cache import LRUCache 
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 
cache = None  
key_counter = 0

@app.route('/set_capacity', methods=['POST'])
def set_capacity():
    global cache
    data = request.get_json()
    capacity = data['capacity']
    cache = LRUCache(capacity=capacity)
    return jsonify({'message': f'Cache capacity set to {capacity}'})

@app.route('/get/<int:key>', methods=['GET'])
def get_key(key):
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    value = cache.get(key)
    return jsonify({'key': key, 'value': value})

@app.route('/put', methods=['POST'])
def put_key():
    global key_counter
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    data = request.get_json()
    value = data['value']
    key = key_counter
    key_counter += 1 
    cache.put(key, value)
    return jsonify({'message': 'Key-Value pair added', 'key': key, 'value': value})

@app.route('/search_or_insert', methods=['POST'])
def search_or_insert():
    global key_counter
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    data = request.get_json()
    value = data['value']
    
    # Check if the value already exists in the cache
    for key in cache.cache.keys():
        node = cache.cache.get_item(key)
        if node and node.value == value:
            # Move the existing value to the most recently used position
            cache.get(key)
            return jsonify({'message': f'Value "{value}" found and moved to the most recently used position', 'key': key, 'value': value})
    
    # If the value does not exist, insert it with a new key
    key = key_counter
    key_counter += 1  # Increment the counter for the next key
    cache.put(key, value)
    return jsonify({'message': f'New value "{value}" added', 'key': key, 'value': value})

@app.route('/get_cache_contents', methods=['GET'])
def get_cache_contents():
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    contents = []
    node = cache.oldest.next
    while node != cache.latest:
        contents.append({'key': node.key, 'value': node.value})
        node = node.next
    return jsonify(contents)

@app.route('/reset', methods=['POST'])
def reset():
    global cache, key_counter
    cache = None
    key_counter = 0
    return jsonify({'message': 'Cache and key counter reset'})

if __name__ == '__main__':
    app.run(debug=True)