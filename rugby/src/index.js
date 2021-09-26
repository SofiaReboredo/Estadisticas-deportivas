import utils from "./utils/utils.js"

// Convertir archivo en array
const equipoA = utils.archivo('rugby/input/equipo-A.txt', '\n')
const equipoB = utils.archivo('rugby/input/equipo-B.txt', '\n')
const partido = utils.archivo('rugby/input/partido.log', '\n')

// Obtener puntos de cada equipo en un partido
const puntosEquipoA = utils.obtenerPuntosEquipo(partido, equipoA)
const puntosEquipoB = utils.obtenerPuntosEquipo(partido, equipoB)

// Mostrar resultado final de un partido
const resultadoFinal = utils.mostrarEquipoGanador(puntosEquipoA, puntosEquipoB, 'A', 'B');

// Mostrar goleador del partido
const goleador = utils.mostrarJugadorMayorPuntaje(partido);

// Retornar distribución de puntos por tipo de anotación
const distribucionDePuntaje = utils.obtenerPuntajePorTipoAnotacion(partido);
console.log(distribucionDePuntaje)

