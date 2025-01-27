class HashTable:
    def __init__(self, size=7):
        self.data_map = [None] * size
        self.size = size
        self.count = 0

    def __hash(self, key):
        if isinstance(key, int):
            return key % len(self.data_map)
        my_hash = 0
        for letter in key:
            my_hash = (my_hash + ord(letter) * 23) % len(self.data_map)
        return my_hash

    def set_item(self, key, value):
        if self.count / self.size > 0.7:  # Load factor threshold
            self.resize()
        index = self.__hash(key)
        if self.data_map[index] is None:
            self.data_map[index] = []
        self.data_map[index].append([key, value])
        self.count += 1

    def get_item(self, key):
        index = self.__hash(key)
        if self.data_map[index] is not None:
            for i in range(len(self.data_map[index])):
                if self.data_map[index][i][0] == key:
                    return self.data_map[index][i][1]
        return None

    def resize(self):
        new_size = self.size * 2
        new_data_map = [None] * new_size
        for i in range(len(self.data_map)):
            if self.data_map[i] is not None:
                for key, value in self.data_map[i]:
                    new_index = self.__hash(key) % new_size
                    if new_data_map[new_index] is None:
                        new_data_map[new_index] = []
                    new_data_map[new_index].append([key, value])
        self.data_map = new_data_map
        self.size = new_size

    def keys(self):
        all_keys = []
        for i in range(len(self.data_map)):
            if self.data_map[i] is not None:
                for j in range(len(self.data_map[i])):
                    all_keys.append(self.data_map[i][j][0])
        return all_keys