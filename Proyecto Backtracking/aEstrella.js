var SecuenciaA = "";
var PasoActual = 1;
function heuristica(estado, objetivo) {
    let mal_colocadas = 0;
    for (let i = 0; i < estado.length; i++) {
      for (let j = 0; j < estado[0].length; j++) {
        if (estado[i][j] !== objetivo[i][j]) {
          mal_colocadas++;
        }
      }
    }
    return mal_colocadas;
}

    
function secuenciaA(){
  var miParrafo = document.getElementById("textoSecuencia");
  miParrafo.textContent = "";
  miParrafo.textContent = SecuenciaA;
}
function retornarMatriz(tablero){
    var matrizSinResolver = [[],[],[],[],[],[],[],[],[]];
    for(let f = 0; f <9; f++){
        for(let c = 0; c <9; c++){
            matrizSinResolver[f].push(tablero[f][c]);
        }
    }
    return matrizSinResolver;
}

function inicioAEstrella(){
    //inicializamos la matriz
    let sudokuASinResolver = retornarMatriz(matrizA);//matrizASinResolver

    ResolverSinCuadrante("A",matrizA);// la matrizA resuelta
    //Nodo Actual en clase
    //logica
    aEstrella(sudokuASinResolver,matrizA);
    
}
class celda{
  constructor(matrizEstado,nodoPadre,accion,g,h){
    this.matrizEstado = matrizEstado;
    this.nodoPadre = nodoPadre;
    this.accion = accion;
    this.g = g;
    this.h = h;
    this.f = g + h;
  }
}
function aEstrella(estadoInicial,estadoObjetivo){
  //damos primer nodo
  
  let celdaInicial = new celda(estadoInicial,null,0,0,heuristica(estadoInicial,estadoObjetivo))
  
  let listaAbierta = [celdaInicial]
  //console.log(listaAbierta)
  let listaCerrada = []

  //while para hacer la salida
  while(listaAbierta.length != 0){
    

    //obtenemos el nodoActual CON EL MENOR VALOR
    let nodoActual = listaAbierta[0];
    let guardarIndice = 0;
    //agarramos al menor valor f
    for(let f = 1; f <listaAbierta.length; f++){
      if(listaAbierta[f].f < nodoActual.f){
        nodoActual = listaAbierta[f];
        guardarIndice = f;
      }
    }
    //ver secuencia
    SecuenciaA += "~~ Numero del nodo agregado: " +  nodoActual.accion + "."
     
  
    let stringListaAbierta = "La cantidad de nodos es " + listaAbierta.length;
    SecuenciaA += "~~ Contenido de la lista abierta: " +  stringListaAbierta + "."
    let stringListaCerrada = "La cantidad de nodos es  " + listaCerrada.length;
    SecuenciaA += "~~ Contenido de la lista Cerrada: " +  stringListaCerrada + "."
    + "."
    secuenciaA();

    //eliminar lista abierta el anterior
    listaAbierta.splice(guardarIndice,1);
    listaCerrada.push(  );

    //comprobar el estado para ver si es igual al objetivo
    if(igualdadEstados(estadoInicial,estadoObjetivo)){
      console.log("FINNNNNNNNNNNNNNNNNNNNNNNNNN")
      let path = []; // reconstruir el camino desde el nodo inicial hasta el nodo objetivo
      let current = nodoActual;
      while (current !== null) {
        path.unshift(current);
        current = current.nodoPadre;
      }
      return path; // devolver el camino encontrado
    }
    //vemos los nodos vecinos
    let nodosVeci = nodosVecinos(nodoActual,estadoObjetivo);
    console.log(nodosVeci);
    //trabajamos con los vecinos

    for (let vecino of nodosVeci) {

      //verificar si el vecino esta en la cerrada
      if (listaCerrada.includes(vecino)) {
        continue;
      }

      //calcuilamos al distancia del nodoActal
      let distanciaG = nodoActual.g + 1;

      //verificamos si el vecino esta en la la lista abierta
      if (listaAbierta.includes(vecino)) {
        if (distanciaG < vecino.g) {
          vecino.g = distanciaG;
          vecino.nodoPadre = nodoActual;
        }
      } else {
        //damos los nuevos valores al vecino
        vecino.g = distanciaG;
        vecino.h = heuristica(vecino.matrizEstado,estadoObjetivo);
        vecino.nodoPadre = nodoActual;

        //agregamos el vecino a la lista abierta para q siga en el ciclo
        listaAbierta.push(vecino);
      }
    }

  }
  return null;//POR SI NO ENCUENTRA SOLUCION
}
//------------------------------------------------------------===============================================
function nodosVecinos(nodo,estaObjetivo){
  let nodos = [];
  //necesitamos una posicion vacia para crear esos vecinos
  let celdaVacia = celdaVaciaEstado(nodo.matrizEstado)

  // Encontrar los valores posibles para la celda vacía
  let valoresPosibles = [];
  for (let valor = 1; valor <= 9; valor++) {
    let valorValido = true;
    // Comprobar si el valor ya está en la fila, columna o cuadrante
    for (let i = 0; i < 9; i++) {
      if (nodo.matrizEstado[i][celdaVacia[1]] == valor || nodo.matrizEstado[celdaVacia[0]][i] == valor) {
        valorValido = false;
        break;
      }
    }
    if (valorValido) {
      let filaCuadrante = Math.floor(celdaVacia[0] / 3) * 3;
      let columnaCuadrante = Math.floor(celdaVacia[1] / 3) * 3;
      for (let i = filaCuadrante; i < filaCuadrante + 3; i++) {
        for (let j = columnaCuadrante; j < columnaCuadrante + 3; j++) {
          if (nodo.matrizEstado[i][j] == valor) {
            valorValido = false;
            break;
          }
        }
        if (!valorValido) break;
      }
    }
    if (valorValido){
      valoresPosibles.push(valor);
    } 
  }
  
  // Crear un nodo vecino para cada valor posible
  for (let i = 0; i < valoresPosibles.length; i++) {
    let nuevoEstado = JSON.parse(JSON.stringify(nodo.matrizEstado));
    nuevoEstado[celdaVacia[0]][celdaVacia[1]] = valoresPosibles[i];
    let nuevoNodo = new celda(nuevoEstado, nodo, valoresPosibles[i], nodo.g + 1, heuristica(nuevoEstado, estaObjetivo));
    nodos.push(nuevoNodo);
  }
  
  return nodos;
}

function cuadrante(posVacia) {
  // Obtiene el subcuadrante en el que se encuentra la posición especificada
  let f = Math.floor(posVacia[0] / 3) * 3;
  let c = Math.floor(posVacia[1] / 3) * 3;
  let finF = f + 2;
  let finC = c + 2;

  return [f,c,finF,finC];
}
function celdaVaciaEstado(tablero){
  for (let f = 0; f < 9; f++){
    for (let c = 0; c < 9; c++){
      if(tablero[f][c] == 0){
          return [f,c];
      }
  }
  }
  
}

function igualdadEstados(estadoActual,estadoObjetivo){
  for(let f = 0; f <9; f++){
    for(let c = 0; c <9; c++){
        if(estadoActual[f][c] != (estadoObjetivo[f][c])){
          return false;
        }
    }
  }return true;
}
