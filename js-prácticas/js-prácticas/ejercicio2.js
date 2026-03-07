// EJERCICIO 2: Cazador de bugs 
// 2.1 Un cliente necesita una función que cuente cuántas vocales hay en un texto, pero nos dice 
// que siempre cuenta de menos. No nos da más detalles, solo el código. 
// 1. Identifica el bug - ¿Qué está mal? 
// 2. Explica el problema - ¿Por qué no cuenta todas las vocales? 
// 3. Arregla el código - Corrígelo para que funcione correctamente 
// 4. Prueba con varios casos - Verifica con diferentes textos 
// --------------------------------------------------------------
// 1. BUG: La función solo cuenta las vocales minúsculas. Ignora las vocales mayúsculas como "A", "E", etc.
// 2. PROBLEMA: Al recorrer el texto tal cual está, "vowels.includes(text[i])" devuelve false si la letra es mayúscula.
// Por eso, cualquier vocal en mayúscula no se cuenta, dando un número menor de vocales.

// Función que cuenta todas las vocales de un texto
function countVowels(text) {
  const vowels = ["a", "e", "i", "o", "u"];
  let counter = 0;

  // SOLUCIÓN: Convertimos todo el texto a minúsculas para que se cuenten todas las vocales
  const lowerText = text.toLowerCase();
// Recorremos cada letra del texto
  for (let i = 0; i < lowerText.length; i++) {
    // Si la letra está en el array de vocales, sumamos 1 al contador
    if (vowels.includes(lowerText[i])) {
      counter++;
    }
  }

  return counter; // Devolvemos el número total de vocales
} 
 
// Array con varias frases de prueba para comprobar que la función funciona
const phrases = [
  "Antes no programaba. Ahora sí!", // frase con mayúsculas y minúsculas
  "¡Hola Mundo!", // frase corta
  "AEIOU y aeiou",  // frase con solo vocales
  "Javascript es divertido" // frase con mezcla de letras y espacios
];

// Recorremos cada frase y mostramos cuántas vocales tiene
phrases.forEach(p => {
  console.log(`"${p}" tiene ${countVowels(p)} vocales.`);
});
 


 
 //------------------------------------------------------------------
// 2.2 Un cliente necesita una función que duplique cada número en un array (multiplicar por 2), 
// pero nos dice que el array original también se está modificando y no quiere eso. 
// 1. Identifica el bug - ¿Por qué se modifica el array original? 
// 2. Explica el concepto - ¿Qué significa "pasar por referencia"? 
// 3. Arregla el código - Haz que NO modifique el original 
// 4. Bonus: Reescríbelo usando .map() 
 

// -------------------------------------------

/* FUNCIÓN ORIGINAL:
function duplicateNumbers(numbers) { 
  for (let i = 0; i < numbers.length; i++) { 
    numbers[i] = numbers[i] * 2; // 1. BUG: La función original modifica el array original porque los arrays se pasan por referencia - numbers[i] = numbers[i] * 2;
  } 
  return numbers; // 2. PROBLEMA: "numbers" apunta al mismo array que "original". Cualquier cambio dentro de la función afecta al array original -  return numbers;
}
  */

function duplicateNumbers(numbers) {
  const result = []; // creamosnuevo array donde guardaremos los valores duplicados
  for (let i = 0; i < numbers.length; i++) { 
    result.push(numbers[i] * 2); // multiplicamos por 2 y guardamos en el nuevo array 
  } 
  return result; // devolvemos el array duplicado, el original no cambia 
} 
 
const original = [1, 2, 3, 4, 5];
const duplicated = duplicateNumbers(original);

console.log("Original:", original);   // [1, 2, 3, 4, 5]
console.log("Duplicated:", duplicated); // [2, 4, 6, 8, 10]

// Otro caso de prueba
const nums = [0, -1, 10];
console.log("Duplicated:", duplicateNumbers(nums)); // [0, -2, 20]

// NOTA: En JavaScript, los arrays se pasan por referencia. 
// Esto significa que si modificamos un array dentro de una función, 
// el array original también se ve afectado. Por eso creamos un nuevo array.
// un array es una lista de cosass
// numbers era el "recipiente" que ya tenía
// result es el "recipiente" nuevo para no ensuciar el original