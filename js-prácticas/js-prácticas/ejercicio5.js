// EJERCICIOS A ELEGIR (puedes hacer el 5 o el 6): 
// EJERCICIO 5: Gestión de Taller 
// Retomamos el ejercicio del parque de coches que vimos en clase. De tal forma que vamos 
// a ampliar las funciones para gestionar el inventario del taller. 
// Datos base: Usa el modelo de datos que creamos en clase (puedes simplificarlo si lo 
// necesitas) y añade 5 coches más, con diferentes datos. 
//Funciones a implementar: 
// 1. getCarsWithBeacon(cars):  
// Retorna array con los coches que TIENEN baliza V16. 
// 2. getCarsWithApprovedBeacon(cars):  
// Retorna array con coches que tienen baliza V16 Y está homologada, útil para saber 
// qué coches cumplen la normativa. 
// 3. getCarsWithLowPressure(cars, minPressure):  
// Recibe un mínimo de presión (ej: 2.0 bar). Retorna coches con AL MENOS UNA 
// rueda por debajo del mínimo. Incluye información de qué ruedas están bajas 
// 4. getCarReport(cars, licensePlate):  
// Busca un coche por matrícula. Genera un informe legible en texto. Incluye: datos 
// básicos (matrícula, marca, Kms, propietario…), estado de seguridad, ruedas, 
// historial de visitas al taller. 
// Requisitos técnicos: - - - 
// Usa métodos de arrays (`.filter()`, `.map()`, `.find()`), 
// NO mutes los datos originales 
// Maneja casos donde no se encuentre el coche 
// TAREAS: 
// 1. Array de datos con al menos 5 coches variados 
// 2. Las 4 funciones implementadas 
// 3. Ejemplos de uso de cada función 
// 4. Comentarios explicando la lógica (si fuera necesario)

// EJERCICIO 5: Gestión de Taller
// Retomamos el ejercicio del parque de coches que vimos en clase
// Vamos a ampliar las funciones para gestionar el inventario del taller

// ---------------------------
// 1️ Array de datos: coches con información básica
const cars = [
  {
    licensePlate: "1234ABC",
    brand: "Toyota",
    kms: 45000,
    owner: "Ángel",
    beacon: true,
    beaconApproved: true,
    tires: [
      { position: "delantera izquierda", pressure: 2.1 },
      { position: "delantera derecha", pressure: 2.0 },
      { position: "trasera izquierda", pressure: 1.9 },
      { position: "trasera derecha", pressure: 2.2 },
    ],
    visits: ["2023-01-10", "2023-06-15"]
  },
  {
    licensePlate: "5678DEF",
    brand: "Ford",
    kms: 80000,
    owner: "María",
    beacon: false,
    beaconApproved: false,
    tires: [
      { position: "delantera izquierda", pressure: 2.3 },
      { position: "delantera derecha", pressure: 2.2 },
      { position: "trasera izquierda", pressure: 2.0 },
      { position: "trasera derecha", pressure: 2.0 },
    ],
    visits: ["2022-12-01"]
  },
  {
    licensePlate: "9101GHI",
    brand: "BMW",
    kms: 12000,
    owner: "Juan",
    beacon: true,
    beaconApproved: false,
    tires: [
      { position: "delantera izquierda", pressure: 1.8 },
      { position: "delantera derecha", pressure: 1.9 },
      { position: "trasera izquierda", pressure: 2.1 },
      { position: "trasera derecha", pressure: 2.1 },
    ],
    visits: []
  },
  {
    licensePlate: "1122JKL",
    brand: "Honda",
    kms: 30000,
    owner: "Miriam",
    beacon: true,
    beaconApproved: true,
    tires: [
      { position: "delantera izquierda", pressure: 2.4 },
      { position: "delantera derecha", pressure: 2.3 },
      { position: "trasera izquierda", pressure: 2.2 },
      { position: "trasera derecha", pressure: 2.1 },
    ],
    visits: ["2023-03-20"]
  },
  {
    licensePlate: "3344MNO",
    brand: "Seat",
    kms: 5000,
    owner: "Pedro",
    beacon: false,
    beaconApproved: false,
    tires: [
      { position: "delantera izquierda", pressure: 2.2 },
      { position: "delantera derecha", pressure: 2.2 },
      { position: "trasera izquierda", pressure: 2.2 },
      { position: "trasera derecha", pressure: 2.2 },
    ],
    visits: []
  }
];

// ---------------------------
// 2️ Funciones

// 2.1 getCarsWithBeacon: devuelve coches que tienen baliza V16
function getCarsWithBeacon(cars) {
  return cars.filter(car => car.beacon); // filtramos solo los coches donde beacon = true
}

// 2.2 getCarsWithApprovedBeacon: devuelve coches que tienen baliza y está homologada
function getCarsWithApprovedBeacon(cars) {
  return cars.filter(car => car.beacon && car.beaconApproved);
}

// 2.3 getCarsWithLowPressure: devuelve coches que tienen al menos una rueda por debajo del mínimo
function getCarsWithLowPressure(cars, minPressure) {
  return cars
    .map(car => {
      const lowTires = car.tires.filter(tire => tire.pressure < minPressure);
      if (lowTires.length > 0) {
        return { ...car, lowTires }; // devolvemos copia del coche con info de ruedas bajas
      }
      return null;
    })
    .filter(car => car !== null);
}

// 2.4 getCarReport: genera un informe legible de un coche por matrícula
function getCarReport(cars, licensePlate) {
  const car = cars.find(c => c.licensePlate === licensePlate);
  if (!car) return `No se encontró coche con matrícula ${licensePlate}`;
  
  const tiresStatus = car.tires.map(t => `${t.position}: ${t.pressure} bar`).join(", ");
  const visits = car.visits.length ? car.visits.join(", ") : "No hay visitas registradas";
  const beaconStatus = car.beacon ? (car.beaconApproved ? "Homologada" : "No homologada") : "Sin baliza";

  return `
Informe del coche ${car.licensePlate}:
Marca: ${car.brand}
Propietario: ${car.owner}
Kms: ${car.kms}
Baliza: ${beaconStatus}
Ruedas: ${tiresStatus}
Historial de visitas: ${visits}
  `;
}

// ---------------------------
// 3️ Ejemplos de uso

console.log("=== Coches con baliza ===");
console.log(getCarsWithBeacon(cars));

console.log("=== Coches con baliza homologada ===");
console.log(getCarsWithApprovedBeacon(cars));

console.log("=== Coches con ruedas por debajo de 2.0 bar ===");
console.log(getCarsWithLowPressure(cars, 2.0));

console.log("=== Informe de coche 1234ABC ===");
console.log(getCarReport(cars, "1234ABC"));

console.log("=== Informe de coche no encontrado ===");
console.log(getCarReport(cars, "0000XYZ"));