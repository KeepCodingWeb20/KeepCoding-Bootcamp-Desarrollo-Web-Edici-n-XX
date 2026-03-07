// EJERCICIO 4: Arreglar bug asíncrono 
// El cliente está intentando obtener datos de un usuario usando su ID (el ID 1 debería existir), 
// pero siempre obtiene undefined. Nos ha pasado el código para que lo revisemos y 
// arreglemos. 
 
// TAREAS: 
// 1. Identifica el problema (¿por qué da undefined?) 
// 2. Explica qué es la asincronía y por qué causa este problema 
// 3. Arréglalo usando Promises 
// 4. Arréglalo también usando async/await 
 
 
// Código a arreglar, simula una llamada a un API que trae usuarios de una base de datos: 
 
 
 /*
function getUser(id) { 
let user; 
setTimeout(() => {     // 1. El problema está aquí: setTimeout no se ejecuta inmediatamente
if (id === 1) { 
user = { id: 1, name: "John Doe" }; 
} 
}, 2000); 
return user; 
} 
const user = getUser(1); 
console.log(user); 
// Resultado esperado: 
Usuario: { id: 1, nombre; 'John Doe' }
*/

// 1. BUG:
// setTimeout es asíncrono. La función devuelve "user" antes de que
// el setTimeout termine, por eso el resultado es undefined.

// 2.  ASINCRONÍA:
// Algunas operaciones en JavaScript tardan tiempo (APIs, bases de datos, timers).
// Estas operaciones no bloquean el programa.
// JavaScript sigue ejecutando el código mientras espera el resultado.
// En este caso, setTimeout tarda 2 segundos, pero la función devuelve "user"
// antes de que se asigne el valor.

// ---------------------------
// 3️ SOLUCIÓN CON PROMISES
function getUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // simulamos llamada a base de datos o API
      if (id === 1) {
        resolve({ id: 1, name: "John Doe" }); // resolve devuelve el usuario correctamente
      } else {
        reject("Usuario no encontrado"); // reject devuelve un error si no existe
      }
    }, 2000); // esperamos 2 segundos para simular retraso real
  });
}

// Usamos .then() para recibir el resultado de la promesa
getUserPromise(1).then(user => {
  console.log("Promise:", user); // { id: 1, name: "John Doe" } // Aquí ya tenemos los datos del usuario
}).catch(error => {
  console.log("Promise error:", error); // Atrapar errores si no existe el usuario
});


// ---------------------------
// 4️ SOLUCIÓN CON ASYNC/AWAIT
async function mostrarUsuario() {
  try {
    // await pausa la ejecución dentro de la función async hasta que la promesa se resuelva
    const user = await getUserPromise(1); // espera a que la promesa se resuelva
    console.log("Async/Await:", user);
  } catch (error) {
    console.log("Async/Await error:", error); // capturamos posibles errores
  }
}

mostrarUsuario(); // llamamos la función async para que muestre el usuario


// ---------------------------
// 5️ DEMOSTRACIÓN DE ASINCRONÍA
// Esto muestra que JavaScript sigue ejecutando mientras espera
console.log("Esto sale primero, antes de que llegue el usuario");
// setTimeout solo para demostrar que el código sigue funcionando mientras esperamos
setTimeout(() => {
  console.log("Esto sale después de 2 segundos");
}, 2000);

// Promises y async/await son formas de "manejar la asincronía".
// Sin esto, no podemos devolver resultados que tardan en llegar.
// La diferencia es solo sintaxis: .then() encadena callbacks, async/await parece sincrónico.