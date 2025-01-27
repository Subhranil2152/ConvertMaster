from doubly_linked_list import Node
from hash_table import HashTable

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = HashTable()
        self.oldest = Node(0, 0)
        self.latest = Node(0, 0)
        self.oldest.next = self.latest
        self.latest.prev = self.oldest

    def get(self, key: int):
        node = self.cache.get_item(key)
        if node:
            self._remove(node)
            self._insert(node)
            return node.value
        return -1

    def put(self, key: int, value):
        node = self.cache.get_item(key)
        if node:
            self._remove(node)
        elif len(self.cache.keys()) >= self.capacity:
            lru_node = self.oldest.next
            self._remove(lru_node)
            self.cache.set_item(lru_node.key, None)  # Remove from hash table

        new_node = Node(key, value)
        self._insert(new_node)
        self.cache.set_item(key, new_node)

    def _remove(self, node):
        prev, next = node.prev, node.next
        prev.next = next
        next.prev = prev

    def _insert(self, node):
        prev = self.latest.prev
        next = self.latest
        prev.next = next.prev = node
        node.next = next
        node.prev = prev

    def get_cache_contents(self):
        contents = []
        temp = self.oldest.next
        while temp != self.latest:
            contents.append({'key': temp.key, 'value': temp.value})
            temp = temp.next
        return contents