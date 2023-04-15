
var matrizA = []; 
var matrizB = [];
var matrizC = [];
var matrizD = [];
var matrizCentro = [];

var BacktrackingPresionado = false;

function fillCeroMatriz(){
    for(let f = 0; f < 9; f++){
        matrizA.push([0,0,0,0,0,0,0,0,0]);
        matrizB.push([0,0,0,0,0,0,0,0,0]);
        matrizC.push([0,0,0,0,0,0,0,0,0]);
        matrizD.push([0,0,0,0,0,0,0,0,0]);
        matrizCentro.push([0,0,0,0,0,0,0,0,0]);
    }
}
function eliminarAtributoDiv(){
    let fila = [0,1,2];
    let columna = [0,1,2];
    let cantidadCuadrantes = 0;

    let posDivA = [["A1"],["A2"],["A3"],["A4"],["A5"],["A6"],["A7"],["A8"],["A9"]];
    let posDivB = [["B1"],["B2"],["B3"],["B4"],["B5"],["B6"],["B7"],["B8"],["B9"]];
    let posDivc = [["C1"],["C2"],["C3"],["C4"],["C5"],["C6"],["C7"],["C8"],["C9"]];
    let posDivd = [["D1"],["D2"],["D3"],["D4"],["D5"],["D6"],["D7"],["D8"],["D9"]];
    let posDivCentro= [["A9"],["E2"],["B7"],["E4"],["E5"],["E6"],["C3"],["E8"],["D1"]];
    for(let n = 0; n <9; n++){
        
        let cuadranteA = document.getElementById(posDivA[n]);
        let celdasA = cuadranteA.querySelectorAll("*");
        
        let cuadranteB = document.getElementById(posDivB[n]);
        let celdasB = cuadranteB.querySelectorAll("*");

        let cuadranteC = document.getElementById(posDivc[n]);
        let celdasC = cuadranteC.querySelectorAll("*");

        let cuadranteD = document.getElementById(posDivA[n]);
        let celdasD = cuadranteD.querySelectorAll("*");

        let cuadranteCentro = document.getElementById(posDivCentro[n]);
        let celdasCentro = cuadranteCentro.querySelectorAll("*");

        let celdaActual = 0;

        for (let f = 0; f <fila.length; f++) {
            for (let c = 0; c < columna.length; c++) {
                celdasA[celdaActual].removeAttribute("ValorTabla");
                celdasB[celdaActual].removeAttribute("ValorTabla");
                celdasC[celdaActual].removeAttribute("ValorTabla");
                celdasD[celdaActual].removeAttribute("ValorTabla");
                celdasCentro[celdaActual].removeAttribute("ValorTabla");
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
function validarCreate(){
    if(BacktrackingPresionado){
        return location.reload();  
    }
    if(!matrizA == []){
          
        matrizA = []; 
        eliminarAtributoDiv()
        matrizB = [];
        matrizC = [];
        matrizD = [];
        matrizCentro = [];
    }
    var boton = document.getElementById("buttonManualBoard")
    boton.disabled = true;
    create();
}

function create(){
    //rellenamos las matrices
    fillCeroMatriz();
    const cantEnFilas = 0;

    //A
    generateSudoku(matrizA,cantEnFilas,0);
    const NumerosEliminar = 4;
    
    

    //B
    let posCuadranteB = [[6,7,8],[0,1,2]]
    generateSudokuMatrizConCuadrante(matrizB,cantEnFilas,0,posCuadranteB,"B");

    //cuadranteB = CuadranteTablero(SudokuBMatriz,[6,7,8],[0,1,2]);
    //rellenarMatrizCentral(cuadranteB,[0,1,2],[6,7,8]);
    
    
    //C
    let posCuadranteC = [[0,1,2],[6,7,8]]
    generateSudokuMatrizConCuadrante(matrizC,cantEnFilas,0,posCuadranteC,"C");
    

    //D
    let posCuadranteD = [[0,1,2],[0,1,2]]
    generateSudokuMatrizConCuadrante(matrizD,cantEnFilas,0,posCuadranteD,"D");


    //centro
    rellenarMatrizCentral();
    generateCentral(matrizCentro);
    
    let posDivCentro= [["A9"],["E2"],["B7"],["E4"],["E5"],["E6"],["C3"],["E8"],["D1"]];
    colocarMatriz(posDivCentro,matrizCentro,"CENTRO");

    eliminarNumerosMatriz(NumerosEliminar);
    //MOSTAR MATRICES
    let posDivA = [["A1"],["A2"],["A3"],["A4"],["A5"],["A6"],["A7"],["A8"],["A9"]];
    colocarMatriz(posDivA,matrizA);

    let posDivB = [["B1"],["B2"],["B3"],["B4"],["B5"],["B6"],["B7"],["B8"],["B9"]];
    colocarMatriz(posDivB,matrizB);

    let posDivc = [["C1"],["C2"],["C3"],["C4"],["C5"],["C6"],["C7"],["C8"],["C9"]];
    colocarMatriz(posDivc,matrizC);

    let posDivd = [["D1"],["D2"],["D3"],["D4"],["D5"],["D6"],["D7"],["D8"],["D9"]];
    colocarMatriz(posDivd,matrizD);
    //habilitamos los botones
    habilitarBotonesDelAlgoritmo();
}
function generateCentral(tablero){
    const num = Math.floor(Math.random() * 3) + 1;
    if(num ==1){
        tablero[1][4] =8;
        tablero[7][4] =9;
    }
    else if(num ==2){
        tablero[1][3] =7;
        tablero[8][5] =3;
    }else{
        tablero[0][4] =4;
        tablero[6][4] =5;
        tablero[8][5] =3;
    }
    tablero[3] = [2, 6, 5, 4, 3, 1, 8, 9, 7];
    tablero[4] = [3, 1, 4, 9, 7, 8, 2, 6, 5];
    tablero[5] = [8, 9, 7, 5, 6, 2, 3, 1, 4];
    
    eliminarNumerosCentral(4);
}
function eliminarNumerosCentral(numerosElim){
    for(let f = 3; f <= 5; f++){
        let posNumerosEliminadosEnFilaCentral = [];
        for(let i = 1; i<= numerosElim; i++){
            let posCentral = posAleatoriaEnFila(posNumerosEliminadosEnFilaCentral);
            matrizCentro[f][posCentral] = 0;
            posNumerosEliminadosEnFilaCentral.push(posCentral);
        }
    }
}
function rellenarMatrizCentral(){

    //A
    let cuadranteA = CuadranteTablero(matrizA,[6,7,8],[6,7,8]);
    let posicionAenCentral = [[0,1,2],[0,1,2]];
    posFilaCuadrante = 0;
    posColCuadrante = 0; 
    for(let f = 0; f < 9; f++) {
        if(posicionAenCentral[0].includes(f)){
            for(let c = 0; c < 9; c++) {
                if(posicionAenCentral[1].includes(c)){
                    matrizCentro[f][c] = cuadranteA[posFilaCuadrante][posColCuadrante];
                    posColCuadrante +=1;
                }

            }
            posColCuadrante = 0;
            posFilaCuadrante +=1;
        }
    }

    //B
    let cuadranteB = CuadranteTablero(matrizB,[6,7,8],[0,1,2]);
    let posicionBenCentral = [[0,1,2],[6,7,8]];
    posFilaCuadrante = 0;
    posColCuadrante = 0; 
    for(let f = 0; f < 9; f++) {
        if(posicionBenCentral[0].includes(f)){
            for(let c = 0; c < 9; c++) {
                if(posicionBenCentral[1].includes(c)){
                    matrizCentro[f][c] = cuadranteB[posFilaCuadrante][posColCuadrante];
                    posColCuadrante +=1;
                }

            }
            posColCuadrante = 0;
            posFilaCuadrante +=1;
        }
    }

    //C
    let cuadranteC = CuadranteTablero(matrizC,[0,1,2],[6,7,8]);
    let posicionCenCentral = [[6,7,8],[0,1,2]];
    posFilaCuadrante = 0;
    posColCuadrante = 0; 
    for(let f = 0; f < 9; f++) {
        if(posicionCenCentral[0].includes(f)){
            for(let c = 0; c < 9; c++) {
                if(posicionCenCentral[1].includes(c)){
                    matrizCentro[f][c] = cuadranteC[posFilaCuadrante][posColCuadrante];
                    posColCuadrante +=1;
                }

            }
            posColCuadrante = 0;
            posFilaCuadrante +=1;
        }
    }

    //D
    let cuadranteD = CuadranteTablero(matrizD,[0,1,2],[0,1,2]);
    let posicionDenCentral = [[6,7,8],[6,7,8]];
    posFilaCuadrante = 0;
    posColCuadrante = 0;  
    for(let f = 0; f < 9; f++) {
        if(posicionDenCentral[0].includes(f)){
            for(let c = 0; c < 9; c++) {
                if(posicionDenCentral[1].includes(c)){
                    
                    matrizCentro[f][c] = cuadranteD[posFilaCuadrante][posColCuadrante];
                    posColCuadrante +=1;
                }

            }
            posColCuadrante = 0;
            posFilaCuadrante +=1;
        }
    }
}
function CuadranteTablero(tablero,fila,columna){//fila =[6,7,8] y columna = [6,7,8]
    let cuadrante = [];
    for(let fi = 0; fi < 9; fi++){
        if(fila.includes(fi)){
            cuadrante.push([])
            for(let co = 0; co < 9; co++){       
                if(columna.includes(co)){
                    cuadrante[cuadrante.length-1].push(tablero[fi][co]);
                }
            }
        }

    }
    return cuadrante;
}
function habilitarBotonesDelAlgoritmo(){
    var botonBack = document.getElementById("Backtracking");
    var botonAEstrella = document.getElementById("A*");
    botonBack.disabled = false;
    botonAEstrella.disabled = false;
}
function generateSudokuMatrizConCuadrante(tablero,cantCeldaEnFila,filActual,posCuadrante,nombreSudoku){//posCuadrante = [[6,7,8],[0,1,2]]
    
    let celdaActual = celdaVacia(tablero,filActual);//[0,2]
    if(!celdaActual){//END
        return true
    }
    let validarCentral = false;

    const fila = celdaActual[0];
    const columna = celdaActual[1];

    for(let n = 1; n <= 9; n++){
        //preguntamos si esta en el cuadrante
        
        if(validarTablero(tablero,celdaActual,n)){
                //validar con el sudoku central
                validarCentral = false;
                if(posCuadrante[0].includes(fila[0]) & posCuadrante[1].includes(columna[0])){

                    let posCentral = posicionDelCuadranteEnElCentral(nombreSudoku,celdaActual);
                    if(validarRowsAndColumns(SudokuCentro,posCentral,n)){
                        validarCentral = true;
                    }else{
                        validarCentral = false;
                    }
                    
                }else{
                    validarCentral = true;
                }
                if(validarCentral){
                    tablero[fila][columna] = n;
                    cantCeldaEnFila+=1;

                    if(cantCeldaEnFila  == 9){//cantidad numerso en filas
                        filActual +=1;
                        cantCeldaEnFila =0;

                    }

                    if(generateSudokuMatrizConCuadrante(tablero,cantCeldaEnFila,filActual,posCuadrante,nombreSudoku)){
                        return true;
                    }
                    tablero[celdaActual[0]][celdaActual[1]] = 0;

                    if(cantCeldaEnFila == 0){
                        filActual -= 1;
                        cantCeldaEnFila =8;
                    }else{
                        cantCeldaEnFila -= 1;
                    }
                }
                
        }
    }
    //si no le sirve ningun numero return false
    return false;
}
function eliminarNumerosMatriz(NumerosEliminarFila){
    for(let f = 0; f < 9; f++){
        let posNumerosEliminadosEnFilaA = [];
        let posNumerosEliminadosEnFilaB = [];
        let posNumerosEliminadosEnFilaC = [];
        let posNumerosEliminadosEnFilaD = [];
        for(let i = 1; i<= NumerosEliminarFila; i++){
            let posA = posAleatoriaEnFila(posNumerosEliminadosEnFilaA);
            matrizA[f][posA] = 0;
            posNumerosEliminadosEnFilaA.push(posA);

            let posB = posAleatoriaEnFila(posNumerosEliminadosEnFilaB);
            matrizB[f][posB] = 0;
            posNumerosEliminadosEnFilaB.push(posB);

            let posC = posAleatoriaEnFila(posNumerosEliminadosEnFilaC);
            matrizC[f][posC] = 0;
            posNumerosEliminadosEnFilaC.push(posC);

            let posD = posAleatoriaEnFila(posNumerosEliminadosEnFilaD);
            matrizD[f][posD] = 0;
            posNumerosEliminadosEnFilaB.push(posD);
        }
    }

}
function posAleatoriaEnFila(posNumerosActuales){
    let listo = false;
    let pos = 0;
    while(!listo){
        pos = Math.floor(Math.random() * 9);
        if(!posNumerosActuales.includes(pos)){
            listo = true;
        }
    }
    return pos;
}
function generateSudoku(tablero,cantCeldaEnFila,filActual){

    let celdaActual = celdaVacia(tablero,filActual);//[0,2]
    if(!celdaActual){//END
        return true
    }
    //probarNUmero por numero
    for(let n = 1; n <= 9; n++){
    
        if(validarTablero(tablero,celdaActual,n)){
            //acomodamos valores
            const fila = celdaActual[0];
            const columna = celdaActual[1];

            tablero[fila][columna] = n;
            cantCeldaEnFila+=1;

            if(cantCeldaEnFila  == 9){
                filActual +=1;
                cantCeldaEnFila =0;
            }

            if(generateSudoku(tablero,cantCeldaEnFila,filActual)){
                return true;
            }
            tablero[celdaActual[0]][celdaActual[1]] = 0;

            if(cantCeldaEnFila == 0){
                filActual -= 1;
                cantCeldaEnFila = 8;
            }else{
                cantCeldaEnFila -= 1;
            }
        }
    }
    //si no le sirve ningun numero return false
    return false;
}

function celdaVacia(tablero,fila){
    if(fila ==9){
        return null
    }
    for (let c = 0; c < 9; c++){
        if(tablero[fila][c] == 0){
            return [fila,c]
        }
    }
    
}

function validarTablero(tablero,posCelda,num){
    for (let i = 0; i < 9; i++) {
        if (tablero[i][posCelda[1]] == num) {
          return false;
        }
        if (tablero[posCelda[0]][i] == num) {
            return false;
        }
    }
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

function colocarMatriz(matrizActual,tablero,NombreMatriz){

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
                    if(NombreMatriz != "CENTRO"){
                        celdas[celdaActual].setAttribute("ValorTabla", "");
                    }else{
                        let filasCentro = [3,4,5];
                        let colCentro = [3,4,5]
                        if(filasCentro.includes(FilaPoner)){
                            celdas[celdaActual].setAttribute("ValorTabla", "");
                        }else{
                            if(colCentro.includes(columna[c])){
                                celdas[celdaActual].setAttribute("ValorTabla", "");
                            }
                        }
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
