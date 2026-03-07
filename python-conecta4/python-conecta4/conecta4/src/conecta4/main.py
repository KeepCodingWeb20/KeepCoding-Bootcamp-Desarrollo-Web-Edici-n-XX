from conecta4.board import Board
from conecta4.player import Player
from conecta4.oracle import BaseOracle, ColumnClassification

def main():
    # 1. Creamos los objetos principales
    tablero = Board()
    jugador_x = Player("Jugador 1", "X")
    oraculo = BaseOracle()

    print("--- BIENVENIDO A CONECTA 4 ---")
    
    # 2. Simulamos algunas jugadas
    # Vamos a llenar la columna 0 para probar el Oráculo
    print("\nInsertando fichas en la columna 0...")
    try:
        # El rango depende de BOARD_ROWS en settings (6)
        for _ in range(6):
            tablero.play(jugador_x.char, 0)
    except ValueError as e:
        print(f"Aviso: {e}")

    # 3. Mostramos el tablero usando tu método print_board
    print("\nEstado actual del tablero:")
    print(tablero.print_board())

    # 4. Probamos el Oráculo
    print("--- RECOMENDACIONES DEL ORÁCULO ---")
    recomendaciones = oraculo.get_recommendation(tablero, jugador_x)

    for rec in recomendaciones:
        estado = "LIBRE (MAYBE)"
        if rec._classification == ColumnClassification.FULL:
            estado = "LLENA (FULL)"
        
        print(f"Columna {rec._index}: {estado}")

    # 5. Comprobamos victoria
    if tablero.is_victory(jugador_x.char):
        print(f"\n¡El jugador {jugador_x.name} ha ganado!")
    else:
        print("\nTodavía no hay victoria.")

if __name__ == "__main__":
    main()

    