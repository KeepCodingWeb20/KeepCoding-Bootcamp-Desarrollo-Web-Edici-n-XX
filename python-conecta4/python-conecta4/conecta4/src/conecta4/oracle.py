from enum import Enum, auto
from conecta4.board import Board
from conecta4.player import Player
from conecta4.settings import BOARD_COLUMNS, BOARD_ROWS
from copy import deepcopy

# Clases de columna
class ColumnClassification(Enum):
    FULL = -1   # imposible
    LOSE = 1    # derrota inminente
    BAD = 5     # Muy indeseable
    MAYBE = 10  # aceptable
    WIN = 100   # victoria inmediata

# Recomendación de una columna: indice + clase
class ColumnRecommendation:
    def __init__(self, index: int, classification: ColumnClassification) -> None:
        self._index = index
        self._classification = classification

class BaseOracle:
    """
    El oráculo más tonto: clasifica las columnas en llenas y no llenas.
    """
    def get_recommendation(self, board: Board, player: Player) -> list[ColumnRecommendation]:
        recommendations = [] # Antes decía 'recommendation' en singular y luego plural
        for index in range(BOARD_COLUMNS):
            recommendations.append(self._get_column_recommendation(board, index, player))
        return recommendations
    
    def _get_column_recommendation(self, board: Board, index: int, player: Player) -> ColumnRecommendation:
        # Faltaba el 'self' al principio y los dos puntos en los tipos
        result = ColumnRecommendation(index, ColumnClassification.MAYBE)
    
        # Comprobamos si el último elemento de la columna (arriba) no es None
        last_element_index = BOARD_ROWS - 1
        if board._columns[index][last_element_index] is not None:
            result = ColumnRecommendation(index, ColumnClassification.FULL) 

        return result
    
class SmartOracle(BaseOracle):
    """
    Refina la recomendación del oráculo base, intentando afinar la
    clasificación MAYBE a algo más preciso. En concreto a WIN: va a determinar
    que jugadas nos llevan a ganar de inmediato.
    """

    def _get_column_recommendation(self,
                                   board: Board,
                                   index: int,
                                   player: Player) -> ColumnRecommendation:
        """
        Afina las recomendaciones Las que hayan salido como MAYBE,
        intento ver si hay algo más `preciso, en concreto una victoria para player
        """
        # Pido la clasificación básica

        recommendation = super()._get_column_recommendation(board, index, player)
        # Afino los Maybe: juego como player en esa columna y compruebo si eso me da una victoria.
        if recommendation._classification == ColumnClassification.MAYBE:
            # se puede mejorar:
            # creo un tablero temporal a partir de board
            # juego en index 
            temp_board = self._play_on_temp_board(board, index, player)
            # le pregunto al tablero temporal si is_victory(player)
            # si es así, reclasifico a WIN
            pass

        return recommendation
    
    def _play_on_temp_board(self, original: Board, index: int, player: Player)->Board:
        """
        Crea una copia (profunda) del board original juega en nombre del player
        en la columna que nos han dicho, y devuelve el board resulñtante
        """
        temp_board = deepcopy(original)
        temp_board.play(player.char, index) 


        return temp_board 
        
