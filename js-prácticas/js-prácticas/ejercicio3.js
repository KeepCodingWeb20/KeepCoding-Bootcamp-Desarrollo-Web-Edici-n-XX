// EJERCICIO 3: Transformaciones 
// Un cliente tiene un array de desarrolladores y nos pide extraer información específica 
// usando métodos de arrays. Quiere obtener los programadores que tengan como habilidad 
// JavaScript y un listado de los proyectos en los que están trabajando 
 
// Datos proporcionados: 

/*
const data = [ 
  { 
    id: 1, 
    nombre: 'Juan', 
    habilidades: ['JavaScript', 'HTML', 'CSS'], 
    proyectos: [ 
      { id: 1, nombre: 'Proyecto 1' }, 
      { id: 2, nombre: 'Proyecto 2' } 
    ] 
  }, 
  { 
    id: 2, 
    nombre: 'María', 
    habilidades: ['Python', 'SQL', 'Django'], 
    proyectos: [ 
      { id: 3, nombre: 'Proyecto 3' }, 
      { id: 4, nombre: 'Proyecto 4' } 
    ] 
  }, 
  { 
    id: 3, 
    nombre: 'Miriam', 
    habilidades: ['UX', 'Figma', 'HTML', 'JavaScript'], 
    proyectos: [ 
      { id: 5, nombre: 'Proyecto 1' }, 
      { id: 6, nombre: 'Proyecto 4' } 
    ] 
  } 
]; 
*/
// MI CÓDIGO:

const data = [ 
  { 
    id: 1, 
    nombre: 'Juan', 
    habilidades: ['JavaScript', 'HTML', 'CSS'], // Si sabe 'JavaScript'
    proyectos: [ 
      { id: 1, nombre: 'Proyecto 1' }, 
      { id: 2, nombre: 'Proyecto 2' } 
    ] 
  }, 
  { 
    id: 2, 
    nombre: 'María', 
    habilidades: ['Python', 'SQL', 'Django'], // no sabe 'JavaScript'
    proyectos: [ 
      { id: 3, nombre: 'Proyecto 3' }, 
      { id: 4, nombre: 'Proyecto 4' } 
    ] 
  }, 
  { 
    id: 3, 
    nombre: 'Miriam', 
    habilidades: ['UX', 'Figma', 'HTML', 'JavaScript'], // Si sabe 'JavaScript'
    proyectos: [ 
      { id: 5, nombre: 'Proyecto 1' }, 
      { id: 6, nombre: 'Proyecto 4' } 
    ] 
  } 
]; 

// Todos en habilidades tienen 'JavaScript'salvo id: 2
// Saben 'JavaScript' id: 1 y id: 3

// Filtrar desarrolladores que saben JavaScript
const javascriptDevelopers = data.filter(dev => // filter recorre el array data
  dev.habilidades.includes("JavaScript")
);

console.log(javascriptDevelopers);





// TAREAS: 
// 1. Filtrar desarrolladores que tengan "JavaScript" como habilidad. 
// 2. Extraer un array con TODOS los nombres de proyectos (sin duplicados). 
 
 
 
// Resultado esperado: 
/*
const javascriptDevelopers = [ 
  { 
    id: 1, 
    nombre: "Juan", 
    habilidades: ["JavaScript", "HTML", "CSS"], 
    proyectos: [ 
      { id: 1, nombre: "Proyecto 1" }, 
      { id: 2, nombre: "Proyecto 2" } 
    ] 
  }, 
  { 
    id: 4, 
    nombre: 'Miriam', 
    habilidades: ['UX', 'Figma', 'HTML', 'JavaScript'], 
    proyectos: [ 
      { id: 5, nombre: 'Proyecto 1' }, 
      { id: 6, nombre: 'Proyecto 4' } 
    ] 
  } 
] 
 
const projectsNames = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3','Proyecto 4'];
*/

// MI CÓDIGO:

// Extraer todos los nombres de proyectos sin duplicados
const projectsNames = []; // creamos array vacio

data.forEach(dev => { // recorremos los desarrolaldores

  dev.proyectos.forEach(proj => {

    if (!projectsNames.includes(proj.nombre)) { // Comprobar si existe
      projectsNames.push(proj.nombre); // lo añadimos
    }

  });

});

console.log(projectsNames);