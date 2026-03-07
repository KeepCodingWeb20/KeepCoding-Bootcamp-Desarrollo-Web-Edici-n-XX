def find_streak(haystack, needle, streak):
    assert streak > 0
    contador = 0
    for element in haystack:
        if element == needle:
            contador += 1
            if contador == streak: 
                return True
        else:
            contador = 0
    return False

def get_nths(matrix, n):
    result = []
    for sublist in matrix:
        if n < len(sublist): 
            result.append(sublist[n])
        else: 
            result.append(None)
    return result

def transpose(matrix):
    if not matrix or not matrix[0]: 
        return []
    
    transposed = []
    # Recorremos tantas veces como filas tiene la primera columna
    for i in range(len(matrix[0])):
        fila = get_nths(matrix, i)
        transposed.append(fila)
    return transposed

def displace_list(elements, distance, filler):
    """Crea el prefijo de Nones para inclinar la matriz"""
    prefix = [filler] * distance
    return prefix + elements

def displace_lol(lol, filler):
    """Aplica displace_list a cada columna de la matriz"""
    displaced_matrix = []
    for i in range(len(lol)):
        columna_desplazada = displace_list(lol[i], i, filler)
        displaced_matrix.append(columna_desplazada)
    return displaced_matrix