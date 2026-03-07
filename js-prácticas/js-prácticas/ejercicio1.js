// EJERCICIO 1: Presentación 
// Crear un objeto que represente tu perfil como desarrollador. Debe tener los siguientes campos: 
// nombre, apellidos, un array con los temas del bootcamp que ya conoces, si tienes experiencia 
// previa programando (boolean), un array de objetos con información de alguna red social que 
// tengas (Linkedin, Github…), ese objeto debe tener el nombre y el link. 


const miPerfil = {
  nombre: "Ángel Eladio",
  apellidos: "Velaz Sánchez",
  temasDelBootcamp: ["JavaScript", "Python", "SQL", "HTML", "CSS"],
  experienciaPrevia: false,
  redes: [
    { nombreRed: "LinkedIn", enlace: "https://es.linkedin.com/in/angelvelazsanchez" },
    { nombreRed: "Github", enlace: "https://github.com/KeepCodingWeb20/KeepCoding-Bootcamp-Desarrollo-Web-Edici-n-XX" },
    { nombreRed: "Portfolio", enlace: "https://angeleladiovelazsanchez.myportfolio.com" }
  ]
};

console.log("=== Mi Perfil ===");
console.log(`Nombre: ${miPerfil.nombre} ${miPerfil.apellidos}`);
console.log("Temas vistos en el bootcamp:", miPerfil.temasDelBootcamp.join(", "));
console.log("Experiencia previa:", miPerfil.experienciaPrevia ? "Sí" : "No");
console.log("Redes:");
miPerfil.redes.forEach(r => console.log(`- ${r.nombreRed}: ${r.enlace}`));