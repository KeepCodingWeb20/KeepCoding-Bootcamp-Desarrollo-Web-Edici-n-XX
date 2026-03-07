from conecta4.settings import BOARD_COLUMNS, BOARD_ROWS, VICTORY_STREAK
from conecta4.list_utils import find_streak, transpose, displace_lol
from copy import deepcopy


# Tipos ---
type MatrixColumn = list[list[str|None]]

class Board:
    """
    Representa un tablero con las dimensiones de settings
    Detecta un victoria
    """

    #  Métodos de clase ---
    @classmethod
    def from_list(cls, raw_columns: MatrixColumn) -> 'Board':
        """Permite crear un tablero a partir de una lista (Factory)"""
        board = cls()
        board._columns = deepcopy(list_repr)
        return board
    
    #  Dunders ---
    def __init__(self) -> None:
        """
        Crea un tablero con las dimensiones adecuadas.
        El tablero es una "matriz" de caracteres d ejugador
        y None representa una posición vacía
        Cada lista es una columna y el fondo es el principio
        """
        self._columns : MatrixColumn = []
        for col_num in range(BOARD_COLUMNS):
            self._columns.append([])
            for row_num in range(BOARD_ROWS):
                self._columns[col_num].append(None)

    # --- TUS FUNCIONES (El motor del juego) ---

    def print_board(self) -> str:
        """Imprime el tablero girado para que se vea bien en consola"""
        matrix_t = transpose(self._columns)
        new_matrix = ""
        for sublist in matrix_t[::-1]:
            linea = ""
            for element in sublist:
                linea += " - " if element is None else f" {element} "
            new_matrix += linea + "\n"
        return new_matrix

    def play(self, player_char: str, col_number: int) -> None:
        """Inserta la ficha en la columna usando la gravedad"""
        try:
            col = self._columns[col_number]
            found_slot = False 
            for index in range(len(col)):
                if col[index] is None:
                    col[index] = player_char
                    found_slot = True
                    break
            if not found_slot:
                raise ValueError("¡La columna está llena!")