//[[0, 0, 2, 4, 0, 1, 0, 0, 3],[0, 0, 0, 3, 5, 0, 2, 0, 1],[1, 0, 0, 0, 2, 6, 4, 0, 0],[0, 0, 0, 0, 1, 2, 0, 3, 4],[0, 0, 1, 0, 4, 3, 5, 0, 0],[2, 3, 0, 0, 0, 5, 0, 1, 0],[4, 0, 5, 0, 3, 0, 0, 2, 0],[0, 2, 6, 1, 0, 0, 3, 0, 0],[3, 0, 0, 2, 0, 4, 0, 0, 5]];
var SecuenciaBacktracking = "";
var PasoActual = 1;

function resolverSudokuBacktracking(){

  BacktrackingPresionado = true;
  var boton = document.getElementById("buttonGenerateRandom");
  boton.textContent = "Eliminar Sudoku";
  let tableroA = matrizA;
  ResolverSinCuadrante("A",tableroA);

  let tableroB = matrizB;
  ResolverSinCuadrante("B",tableroB);

  let tableroc = matrizC;
  ResolverSinCuadrante("C",tableroc);

  let tableroD = matrizD;
  ResolverSinCuadrante("D",tableroD);

  let tableroCemtral = matrizCentro;
  ResolverSinCuadrante("Central",tableroCemtral);

  //agregar resultado
  let posDivA = [["A1"],["A2"],["A3"],["A4"],["A5"],["A6"],["A7"],["A8"],["A9"]];
  colocarResultado(posDivA,matrizA);

  let posDivB = [["B1"],["B2"],["B3"],["B4"],["B5"],["B6"],["B7"],["B8"],["B9"]];
  colocarResultado(posDivB,matrizB);

  let posDivc = [["C1"],["C2"],["C3"],["C4"],["C5"],["C6"],["C7"],["C8"],["C9"]];
  colocarResultado(posDivc,matrizC);

  let posDivd = [["D1"],["D2"],["D3"],["D4"],["D5"],["D6"],["D7"],["D8"],["D9"]];
  colocarResultado(posDivd,matrizD);

  let posDivCentro= [["A9"],["E2"],["B7"],["E4"],["E5"],["E6"],["C3"],["E8"],["D1"]];
  colocarResultado(posDivCentro,matrizCentro);

  //mostrar secuencia
  secuenciaBack()
}
function secuenciaBack(){
  var miParrafo = document.getElementById("textoSecuencia");
  miParrafo.textContent = SecuenciaBacktracking;
}
function colocarResultado(matrizActual,tablero){

    let fila = [0,1,2];
    let columna = [0,1,2];
    let cantidadCuadrantes = 0;
    for(let n = 0; n <9; n++){
        
        let cuadrante = document.getElementById(matrizActual[n]);
        let celdas = cuadrante.querySelectorAll("*");

        let celdaActual = 0;

        
        for (let f = 0; f <fila.length; f++) {
            let FilaPoner = fila[f];
            for (let c = 0; c < columna.length; c++) {
                if(tablero[FilaPoner][columna[c]] != 0){
                  if(celdas[celdaActual].getAttribute("ValorTabla") != ""){
                    celdas[celdaActual].style.color = "black";
                  }
                  celdas[celdaActual].textContent = tablero[FilaPoner][columna[c]];
                }else{
                    celdas[celdaActual].textContent =  ' ';
                }
                celdaActual+=1;
            }
        }
        cantidadCuadrantes += 1;
        
        if(cantidadCuadrantes%3 == 0){
            //acomodar filas
            for (let i = 0; i < fila.length; i++) {
                fila[i] += 3;
            }
            columna = [0,1,2];
        }else{//acomodar columnas
            for (let i = 0; i < columna.length; i++) {
                columna[i] += 3;
            }
        }

    } 
}
function ResolverSinCuadrante(nombreMatriz,table){//PODA
  const celda =  celdaEficiente(table);//celdaEficiente

  if(!celda){//validar que haya terminado
    return true;
  } 
  
  const numerosAprobados = numerosValidados(table,celda[0],celda[1])
  for(let n = 0; n < numerosAprobados.length ; n++){  
    const numeroActual = numerosAprobados[n];
    table[celda[0]][celda[1]] = numeroActual;
    SecuenciaBacktracking += "PASO en la matriz "+nombreMatriz+": " + PasoActual + ", NumeroActual: "+ numeroActual +" PosCelda: ["+ celda+"]  ~ "
    PasoActual+=1;
    if(ResolverSinCuadrante(nombreMatriz,table)){
      
      return true;
    }

    SecuenciaBacktracking += "PASO en la matriz "+nombreMatriz+": " + PasoActual + ", [NumeroActual: "+ numeroActual +" PosCelda: ["+ celda[0] + "," +celda[1]+"] "
    PasoActual+=1;
    table[celda[0]][celda[1]] = 0;
    
  }
  //si no le sirve ningun numero return false para q elimine ese numero anterior
  return false;
}
function celdaEficiente(tableroParaVerNumeros) {
  let minimoNumero = Infinity;
  let celdaEfic = null;

  for (let f = 0; f < 9; f++) {
    for (let c = 0; c < 9; c++) {
      if (tableroParaVerNumeros[f][c] == 0) {
        const numBueno = numerosValidados(tableroParaVerNumeros,f, c);
        const cantidaNumerosPosibles = numBueno.length;
        if (cantidaNumerosPosibles < minimoNumero) {
          minimoNumero = cantidaNumerosPosibles;
          celdaEfic = [f, c];
        }
      }
    }
  }
  return celdaEfic;
}
function numerosValidados(tablero,fila, columna) {

  const numerosTotales = new Set();

  //fila y columna
  for (let i = 0; i < 9; i++) {
    numerosTotales.add(tablero[fila][i]);
    numerosTotales.add(tablero[i][columna]);
  }

  // Verificar los números en el bloque
  const cuadranteFila = Math.floor(fila / 3) * 3;
  const cuadranteColu = Math.floor(columna / 3) * 3;
  for (let i = cuadranteFila; i < cuadranteFila + 3; i++) {
      for (let j = cuadranteColu; j < cuadranteColu + 3; j++) {
        numerosTotales.add(tablero[i][j]);
      }
  }

  // Obtener los números no utilizados
  const numerosValidados = [];
  for (let i = 1; i <= 9; i++) {
    if (!numerosTotales.has(i)) {
      numerosValidados.push(i);
    }
  }

  return numerosValidados;
}
function casillaVacia(tablero){
    for (let f = 0; f < 9; f++) {
        for (let c = 0; c < 9; c++) {
          if (tablero[f][c] == 0) {
            return [f, c];
          }
        }
      }
    return null;//retorna null porq ya no hay vacios
}


function mostrarMatriz(posDeLaMatriz,tablero){
  let fila = [0,1,2];
  let columna = [0,1,2];
  let cantidadCuadrantes = 0;
  for(let n = 0; n < 9; n++){
      
      let cuadrante = document.getElementById(posDeLaMatriz[n]);
      let celdas = cuadrante.querySelectorAll("*");
      
      let celdaActual = 0;

      
      for (let f = 0; f <fila.length; f++) {
          let FilaPoner = fila[f];
          for (let c = 0; c < columna.length; c++) {
              celdas[celdaActual].textContent = tablero[FilaPoner][columna[c]];
              celdaActual+=1;
          }
      }
      cantidadCuadrantes += 1;
      
      if(cantidadCuadrantes%3 == 0){
          //acomodar filas
          for (let i = 0; i < fila.length; i++) {
              fila[i] += 3;
          }
          columna = [0,1,2];
      }else{//acomodar columnas
          for (let i = 0; i < columna.length; i++) {
              columna[i] += 3;
          }
      }

  } 
}

function validarFilasColumnas(tablero,posCelda,num){
    for (let i = 0; i < 9; i++) {
        if (tablero[i][posCelda[1]] == num) {
          return false;
        }
        if (tablero[posCelda[0]][i] == num) {
            return false;
        }
    }
    return true;
}

function validarCuadranteBacktracking(tablero,posCelda,num){
  const cuadranteFila = Math.floor(posCelda[0] / 3) * 3;
  const cuadranteColu = Math.floor(posCelda[1] / 3) * 3;
  for (let i = cuadranteFila; i < cuadranteFila + 3; i++) {
      for (let j = cuadranteColu; j < cuadranteColu + 3; j++) {
          if (tablero[i][j] === num) {
              return false;
          }
      }
  }
  return true;
}
//resolverSudokuBacktracking()