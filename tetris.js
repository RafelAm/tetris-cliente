// Captura de los canvas.
const canvas = document.getElementById("tetris");
const lienzo = canvas.getContext("2d");
const Pieza = document.getElementById("sigPieza");
const lPieza = Pieza.getContext("2d");

// Declaracion de las filas y columnas del tablero
const filas = 20;
const columnas = 10;
// Tamaño de la celda en px
const tamanoCelda = 30;
// Identificador SetInterval
let reloader;
// Tiempo del SetInterval
let tiempo = 500;
// Variiable booleana para identificar si el juego se ha parado o no
let stp = false;
// Variable para los puntos del jugador
let puntos = 0;
// Variable para capturar el div donde va el recuento de puntos
let puntuacion = document.getElementById("puntos");
// Inserccion de los puntos en 0
puntuacion.innerHTML = "<h2> Puntuación: " + puntos + "</h2>";
//  Inicializacion del tablero vacio
const tablero = [];

// Si en tablero es vacio llamamos a rellenarTablero();
if (tablero.length == 0) {
  rellenarTablero();
}
// Rellenado del tablero con 0s
function rellenarTablero() {
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
      tablero[i][j] = 0;
    }
  }
}

// Inicializacion del array de las piezas con las piezas.
let piezas = [
  {
    nombre: "T",
    forma: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    probabilidad: 0.125,
    color: "purple",
  },
  {
    nombre: "C",
    forma: [
      [1, 1, 1],
      [1, 0, 1],
    ],
    probabilidad: 0.125,
    color: "red",
  },
  {
    nombre: "l",
    forma: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0]
    ],
    probabilidad: 0.125,
    color: "blue",
  },
  {
    nombre: "->L",
    forma: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    probabilidad: 0.125,
    color: "yellow",
  },
  {
    nombre: "L<-",
    forma: [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
    probabilidad: 0.125,
    color: "greenyellow",
  },
  {
    nombre: "Z",
    forma: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    probabilidad: 0.125,
    color: "green",
  },
  {
    nombre: "S",
    forma: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    probabilidad: 0.125,
    color: "pink",
  },
  {
    nombre: "0",
    forma: [
      [1, 1],
      [1, 1],
    ],
    probabilidad: 0.125,
    color: "orange",
  },
];


// Funcion para devolver todas las piezas a la posicion original cada vez que se actualiza el tablero
function cargarPiezas(){
  return piezas = [
    {
      nombre: "T",
      forma: [
        [1, 1, 1],
        [0, 1, 0],
      ],
      probabilidad: 0.125,
      color: "purple",
    },
    {
      
      nombre: "C",
      forma: [
        [1, 1, 1],
        [1, 0, 1],
      ],
      probabilidad: 0.125,
      color: "red",
    },
    {
      nombre: "l",
      forma: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
      ],
      probabilidad: 0.125,
      color: "blue",
    },
    {
      nombre: "->L",
      forma: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
      probabilidad: 0.125,
      color: "yellow",
    },
    {
      nombre: "L<-",
      forma: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
      ],
      probabilidad: 0.125,
      color: "greenyellow",
    },
    {
      nombre: "Z",
      forma: [
        [1, 1, 0],
        [0, 1, 1],
      ],
      probabilidad: 0.125,
      color: "green",
    },
    {
      nombre: "S",
      forma: [
        [0, 1, 1],
        [1, 1, 0],
      ],
      probabilidad: 0.125,
      color: "pink",
    },
    {
      nombre: "0",
      forma: [
        [1, 1],
        [1, 1],
      ],
      probabilidad: 0.125,
      color: "orange",
    },
  ];
}



// LOGICA
// Variable que contiene la pieza que aparece en el tablero
// Al principio la genera random y despues se le asigna la variable siguientePieza
let piezaf = generarPieza();
// Variable que contiene la siguiente pieza
let siguientePieza = generarPieza();
// Posicion por defecto donde aparecen las piezas
let x = 4;
let y = 0;

// Dibujar el fondo del tablero en negro
function dibujarTablero() {
  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      if (tablero[fila][columna] == 1) {
        lienzo.fillStyle = "gray";
      } else {
        lienzo.fillStyle = "black";
      }
      lienzo.fillRect(
        columna * tamanoCelda,
        fila * tamanoCelda,
        tamanoCelda,
        tamanoCelda
      );
    }
  }
}

// Dibujar las piezas encima del tablero
function dibujarPieza(piezas, x, y) {
  
  for (let i = 0; i < piezas.forma.length; i++) {
    for (let j = 0; j < piezas.forma[i].length; j++) {
      if (piezas.forma[i][j] == 1) {
        // Capturamos el color del objeto 
        lienzo.fillStyle = piezas.color;
        // Pintamos la pieza
        lienzo.fillRect(
          (x + j) * tamanoCelda,
          (y + i) * tamanoCelda,
          tamanoCelda,
          tamanoCelda
        );
        
      }
    }
  }
}

// Dibujar la siguente pieza en el otro canvas
function dibujarSigPieza(piezas) {
  lPieza.clearRect(0, 0, Pieza.width, Pieza.height);
  for (let i = 0; i < piezas.forma.length; i++) {
    for (let j = 0; j < piezas.forma[i].length; j++) {
      if (piezas.forma[i][j] == 1) {
        // Llamada a la funcion que pone las piezas en forma original
        cargarPiezas();
        
        lPieza.fillStyle = piezas.color;
        // Pintamos la pieza
        lPieza.fillRect(
          (0.2 + j) * tamanoCelda,
          (0.2 + i) * tamanoCelda,
          tamanoCelda,
          tamanoCelda
        );
      }
    }
  }
}


// Generar piezas aleatorias
function generarPieza() {
  // Sacamos un random entre 0 y 1
  let indiceRandom = Math.random();
  let probabilidad = 0;
  // Recorremos el array y vamos sumando las probabilidades si random es menor a probabilidad devolvemos pieza
  for (const pieza of piezas) {
    probabilidad += pieza.probabilidad;
    if (indiceRandom < probabilidad) {
      return pieza;
    }
  }
}


// Chequeador de colisiones
function chequearColisiones(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      if (pieza.forma[i][j] !== 0) {
        // Miramos solo las piezas que son 1 asi no nos colisionan los 0
        let X = x + j;
        let Y = y + i;
        // Mirar si está fuera de los límites del tablero
        if (X < 0 || Y >= 20 || X >= 10) {
          return true;
        }
        // Mirar si la celda en el tablero ya está ocupada
        if (tablero[Y][X] == 1) {
          return true;
        }
      }
    }
  }
  return false;
}

// Posicionar la pieza dentro del array
function posicionaPieza(pieza, x, y) {
  for (let i = 0; i < pieza.forma.length; i++) {
    for (let j = 0; j < pieza.forma[i].length; j++) {
      // Todo lo que sean 1 dentro del array del objeto lo guardamos en el array del tablero
      if (pieza.forma[i][j] == 1) {
        tablero[y + i][x + j] = 1;
      }
    }
  }
}

// Eliminar lineas del array si son toda completa 1s
function eliminarLinea() {
  for (let i = 0; i < filas; i++) {
    // Con este if miramos si la linea completa son 1
    if (tablero[i].every((test) => test === 1)) {
      // Cogemos la fila y la eliminamos
      tablero.splice(i, 1);
      // Con unshift añadimos la linea faltante abajo a la parte de arriba y la rellenamos de 0
      tablero.unshift(Array(columnas).fill(0));
      // Suma de puntos
      puntos += 50;
      // Llamada a la funcion que mira los puntos que tenemos 
      velocidad();
      // Carga de los puntos obtenidos al HTML
      puntuacion.innerHTML = "<h2> Puntuación: " + puntos + "</h2>";
    }
  }
}

// Funcion para rotar pieza
function rotar(pieza) {
  // Declaramos una array vacia para guardar la forma de la pieza rotada
  const arr = [];

  // Recorremos la pieza en filas y columnas
  for (let i = 0; i < pieza.forma[0].length; i++) {
    // Creamos un array para guardar las filas
    const arr1 = [];
    // Recorremos la pieza y guardamos cada fila dentro del array de filas
    for (let j = pieza.forma.length - 1; j >= 0; j--) {

      arr1.push(pieza.forma[j][i]);
    }
    // Con el Array final de filas le hacemos un push a un array nuevo para tener la forma final
    arr.push(arr1);
  }
  // Guardamos la forma original
  let formaOriginal = pieza.forma;
  // Cambiamos la forma del objeto original a la rotada
  pieza.forma = arr;
  // Si la pieza rotada sale del mapa o tiene alguna colision devolvemos la forma original
  if (chequearColisiones(pieza, x, y)) {
    pieza.forma = formaOriginal;
  }
  
}


// Actualizacion constante
function actualizar() {
  // Si la pieza toca abajo y es out of bounds o hay un 1 en el array 
  if (chequearColisiones(piezaf, x, y + 1)) {
    // Posicionamos la pieza en su eje x y eje y final
    posicionaPieza(piezaf, x, y);
    // Pintamos todo el tablero para cargar la pieza colocada de color gris
    dibujarTablero();
    // Volvemos a definir la pieza a la posicion inicial
    x = 4;
    y = 0;
    // Le pasamos la siguiente pieza generada
    piezaf = siguientePieza;
    // Generamos una pieza nueva
    siguientePieza = generarPieza();
    // Llamamos a la funcion que nos recarga las piezas a la forma original
    cargarPiezas();
  } else {
    // Llamamos a la funcion para comprobar si hay una linea completa
    eliminarLinea();
    // Movemos la pieza automaticamente hacia abajo
    lienzo.moveTo(x, y++);
  }
  // Dibujamos la siguiente pieza en el otro canvas
  dibujarSigPieza(siguientePieza);
}



// Funcion para iniciar el juego
function jugar() {
  // Chequeamos la colision de la posicion original
  // Si la posicion original esta ocupada o no cabe la pieza hace game over
  if (chequearColisiones(piezaf, 4, 0)) {
    // Introduccion del mensaje de game over en el HTML
    document.getElementById("info").innerHTML =
      "<h1>GAME OVER!, Este juego ha sido desarollado por Rafel Amengual Tomás</h1>";
      // Paramos el intervañ
    clearInterval(reloader);
    // Cambiamos la variable booleana a tru para que no deje mover la pieza una vez haya finalizado el juego
    stp = true;
  } else {
    // Llamamos a la funcion actualizar para que recargue todo el tablero y haga las pruebas correspondientes
    actualizar();
    // Pintamos el tablero de nuevo
    dibujarTablero();
    // Pintamos la pieza en el tablero otra vez
    dibujarPieza(piezaf, x, y);
  }
}



// Funcion para pausar el juego
function stop(){
  // Paramos el interval  
  clearInterval(reloader);
  // Paramos el uso del teclado
  stp = true;
  // Devolvemos true
  return stp;
}

// Funcion para reanudar el juego
function start(){
  // Volvemos a permitir el uso del teclado
  stp = false;
  // Paramos el interval por si algun gracioso le ha dado al boton si pausar
  clearInterval(reloader);
  // Volvemos a definir el set interval
  reloader =  setInterval(jugar,tiempo);
  // Devolvemos false
  return stp;
}


// Funcion que comprueba los puntos actuales y aumenta la velocidad a medida que va pasando el tiempo
function velocidad(){
  // Si los puntos son x
  if(puntos == 100){
    // Paramos el interval
    clearInterval(reloader);
    // Le quitamos tiempo a la variable de los segundos
    tiempo -= 100;
    // Volvemos a ejecutar el interval con el tiempo nuevo
    reloader = setInterval(jugar,tiempo);
  }
  // Si los puntos son x
  if(puntos == 200){
    // Paramos el interval
    clearInterval(reloader);
    // Le quitamos tiempo a la variable de los segundos
    tiempo -= 100;
    // Volvemos a ejecutar el interval con el tiempo nuevo
    reloader = setInterval(jugar,tiempo);
  }
  if(puntos == 300){
    // Paramos el interval
    clearInterval(reloader);
    // Le quitamos tiempo a la variable de los segundos
    tiempo -= 100;
    // Volvemos a ejecutar el interval con el tiempo nuevo
    reloader = setInterval(jugar,tiempo);
  }
  // Si los puntos son x
  if(puntos == 600){
    // Paramos el interval
    clearInterval(reloader);
    // Le quitamos tiempo a la variable de los segundos
    tiempo -= 100;
    // Volvemos a ejecutar el interval con el tiempo nuevo
    reloader = setInterval(jugar,tiempo);

  }
}



// Event Listener para detectar la presion de teclas
document.addEventListener("keydown", function (event) {
  // Si la variable booleana es false permitimos mover las piezas
  if(!stp){
    // Si es a movemos la pieza a la izquierda
  if (event.key === "a" || event.key === "A") {
    // Comprobamos que no esta fuera del tablero hacia la izquierda es decir que x no sea un valor negativo
    if (!chequearColisiones(piezaf, x - 1, y)) {
      x--;
    }
  }
  // Si es d movemos la pieza a la derecha
  if (event.key === "d" || event.key === "D") {
    // Comprobamos que no este fuera del tablero hacia la derecha es decir que x no sea mayor al tamaño del array 
    if (!chequearColisiones(piezaf, x + 1, y)) {
      x++;
    }
  }
  // Si es s bajamos la pieza mas rapido
  if (event.key === "s" || event.key === "S") {
    // Comprobamos que no pase del fondo
    if (!chequearColisiones(piezaf, x, y + 1)) {
      y++;
    }
  }
  // Si es w rotamos la pieza
  if (event.key === "w" || event.key === "W") {
    // Comprobamos que la pieza no salga del tablero hacia abajo
    if (!chequearColisiones(piezaf, x, y + 1)) {
      // Llamamos a la funcion que rota las piezas
      rotar(piezaf);
    }
  }
}
  // Dibujamos cada vez el tablero y la pieza para que no tenga que esperar al interval y sea mas fluido
  dibujarTablero();
  dibujarPieza(piezaf, x, y);
});



// Interval para que funcione el juego
reloader = setInterval(jugar, tiempo);
