class Player:
    def __init__(self, name: str, char: str):
        self._name = name
        self._char = char
        
    @property
    def char(self):
        return self._char

    @property
    def name(self):
        return self._name