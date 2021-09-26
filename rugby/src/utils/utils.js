import fs from 'fs';

/**
 * Convierte la cadena de texto de un archivo en un array.
 * @param {String} nombre es la ruta del archivo
 * @param {String} delimitador es el separador que divide la cadena de texto
 * @returns {Object} un array de eventos
 */
const archivo = (nombre, delimitador) => {
  const existe = fs.existsSync(nombre)
  if (existe) {
    const texto = fs.readFileSync(nombre, 'utf-8');
    const array = texto.split(delimitador)
    return array;
  } else {
    console.log('La ruta no existe');
  }
}

/**
 * Agrega propiedades (nombre, apellido) a un array con los datos de un equipo.
 * @param {Object} array es el array con los datos de un equipo
 * @param {String} separador es el delimitadir que divide la cadena de texto
 * @returns {Object} un array con propiedades asignadas
 */
function agregarPropiedadesAEquipo(array, separador) {
  return array.map(e => ({
    nombre: e.split(separador).slice(0, -1).join(separador), apellido: e.split(separador).slice(-1).join(separador)
  }));
}

/**
 * Devuelve los puntos de un elemento de un array, segun el tipo de anotacion realizada.
 * @param {Object} e es un elemento del array
 * @returns los puntos del elemento del array
 */
function getPuntosPartido(e) {
  let puntaje = 0;

  const TRY = { tipoAnotacion: 'TRY', puntos: 5 };
  const CONVERSION = { tipoAnotacion: 'CONVERSION', puntos: 2 };

  (e.tipoAnotacion == TRY.tipoAnotacion) ? (puntaje += TRY.puntos) : (puntaje += CONVERSION.puntos)

  return puntaje;
}

/**
 * Agrega propiedades (apellido, tipo de anotacion) a un array con los datos de un partido.
 * @param {Object} array es el array con los datos de un partido.
 * @param {String} separador es el delimitadir que divide la cadena de texto
 * @returns {Object} un array de objetos con propiedades asignadas.
 */
function agregarPropiedadesAPartido(array, separador) {
  const nuevoArray = array.map(e => ({
    apellido: e.split(separador).slice(0, -1).join(separador), tipoAnotacion: e.split(separador).slice(-1).join(separador)
  }));

  return nuevoArray.map(e => ({
    ...e, puntos: getPuntosPartido(e)
  }));

}

/**
 * Devuelve los puntos obtenidos por un equipo en un partido.
 * @param {Object} partido es un array de objetos, con los datos del partido
 * @param {Object} equipo es un array de objetos, con los datos del equipo
 * @returns los puntos obtenidos por un equipo
 */
function obtenerPuntosEquipo(partido, equipo) {
  let partidoNuevo = agregarPropiedadesAPartido(partido, ",");
  let equipoNuevo = agregarPropiedadesAEquipo(equipo, " ");
  let apellidosEquipo = equipoNuevo.map(e => { return e.apellido; });
  let apellidosDelEquipoEnPartido = partidoNuevo.filter(e => apellidosEquipo.includes(e.apellido));
  let puntosEquipo = apellidosDelEquipoEnPartido.reduce((acum, e) => {
    acum = acum + e.puntos;
    return acum;
  }, 0)
  return puntosEquipo
}

/**
 * Muestra el equipo ganador (quien obtuvo más puntos durante el partido).
 * @param {Number} puntos1 son los puntos totales obtenidos por uno de los equipos en un partido
 * @param {Number} puntos2 son los puntos totales obtenidos por el segundo equipo en un partido
 * @param {String} nombreEquipo1 es el nombre de uno de los equipos
 * @param {String} nombreEquipo2 es el nombre del segundo equipo
 * @returns un mensaje indicando los puntos realizados por cada equipo y quien resultó ganador
 */
function mostrarEquipoGanador(puntos1, puntos2, nombreEquipo1, nombreEquipo2) {
  const ganador = puntos1 > puntos2 ? nombreEquipo1 : nombreEquipo2
  console.log('El equipo ' + nombreEquipo1 + ' realizó ' + puntos1 + ' puntos y el equipo ' + nombreEquipo2 + ' hizo ' + puntos2 + ' puntos. El ganador es el equipo ' + ganador + '.');
}

/**
 * Debuelve los puntos realizados por cada jugador en un partido.
 * @param {Object} partido es un array de objetos, con los datos del partido
 * @returns los puntos totales que anotó cada jugador en el partido
 */
function obtenerPuntajePorJugador(partido) {
  let partidoNuevo = agregarPropiedadesAPartido(partido, ",");
  return partidoNuevo.reduce((acum, e) => {
    acum[e.apellido] = (acum[e.apellido] || 0) + (e.puntos)
    return acum;
  }, {});
}

/**
 * Muestra el jugador que realizó mayor cantidad de anotaciones durante el partido.
 * @param {Object} array es el objeto que contiene los puntos realizados por cada jugador.
 */
function mostrarJugadorMayorPuntaje(array) {
  const arrayJugadores = obtenerPuntajePorJugador(array);
  let arr = Object.keys(arrayJugadores).map(function (key) { return arrayJugadores[key]; });
  const puntosMax = Math.max.apply(null, arr);

  Object.keys(arrayJugadores).forEach(key => {
    if (arrayJugadores[key] == puntosMax) {
      console.log('El jugador que mas anoto durante el partido fue ' + key + ' con ' + puntosMax + ' puntos.');
    }

  });

}

/**
 * Debuelve los puntos realizados por cada distribuidos por tipo de anotación en un partido.
 * @param {Object} partido es un array de objetos, con los datos del partido
 * @returns los puntos totales distribuidos por tipo de anotación en el partido
 */
function obtenerPuntajePorTipoAnotacion(partido) {
  let partidoNuevo = agregarPropiedadesAPartido(partido, ",");
  return partidoNuevo.reduce((acum, e) => {
    acum[e.tipoAnotacion] = (acum[e.tipoAnotacion] || 0) + (e.puntos)
    return acum;
  }, {});
}


export default {
  archivo,
  obtenerPuntosEquipo,
  mostrarEquipoGanador,
  mostrarJugadorMayorPuntaje,
  obtenerPuntajePorTipoAnotacion
}