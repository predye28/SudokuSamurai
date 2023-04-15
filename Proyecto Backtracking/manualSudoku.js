
function createSudokuManual(){
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
    var boton = document.getElementById("buttonGenerateRandom")
    boton.disabled = true;
    

    fillCeroMatriz();
    var div = document.getElementById("boardManual");
    div.style.display = "flex";

    var div2 = document.getElementById("board");
    div2.style.display = "none";
    createTableManual();
}

function createTableManual(){
    //CREAR TABLERO 9X9
    for (var i=0;i<49;i++){//cantidad de box
        let idCelda = 1;
            if(boxTransparent.includes(i)){//box transparente y la ignoramos
                document.getElementsByClassName("boxManual")[i].classList.add("boxTransparent");
            }else if(boxCorner.includes(i)){
                document.getElementsByClassName("boxManual")[i].innerHTML="<div id='"+(idCelda)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+1)+"' class='cell cellCorner'><input type='text' id='nombre' name='nombre'></div><div id='"+(idCelda+2)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+3)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+4)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+5)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+6)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+7)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+8)+"' class='cell cellCorner'><input type='text' id='"+idCelda+"' name='nombre'></div>"
            }else{
                document.getElementsByClassName("boxManual")[i].innerHTML="<div id='"+(idCelda)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+1)+"' class='cellManual'><input type='text' id='nombre' name='nombre'></div><div id='"+(idCelda+2)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+3)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+4)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+5)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+6)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+7)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div><div id='"+(idCelda+8)+"' class='cellManual'><input type='text' id='"+idCelda+"' name='nombre'></div>"
                //readonly para q no pueda ingresar valores
                countIdCelda += 9;
            }            
    }
}
function guardarValores(){
    var boton = document.getElementById("Backtracking")
    boton.disabled = false;
    var boton = document.getElementById("A*")
    boton.disabled = false;
    //guardar en las matrices
    for (var i=0;i<49;i++){//cantidad de box
        let idCelda = 1;
        let idBoxManual = document.getElementsByClassName("boxManual")[i].id;
        const startsWithA = /^A/i.test(idBoxManual);
        const secondChar = idBoxManual.charAt(1);
        if(startsWithA){//box transparente y la ignoramos
            cuadranteSacarTexto(secondChar,idBoxManual)
        }      
    }
    console.log(matrizA);

    //mostrar en el tablero
    let posDivCentro= [["A9"],["E2"],["B7"],["E4"],["E5"],["E6"],["C3"],["E8"],["D1"]];
    colocarMatriz(posDivCentro,matrizCentro,"CENTRO");

    //MOSTAR MATRICES
    let posDivA = [["A1"],["A2"],["A3"],["A4"],["A5"],["A6"],["A7"],["A8"],["A9"]];
    colocarMatriz(posDivA,matrizA);

    let posDivB = [["B1"],["B2"],["B3"],["B4"],["B5"],["B6"],["B7"],["B8"],["B9"]];
    colocarMatriz(posDivB,matrizB);

    let posDivc = [["C1"],["C2"],["C3"],["C4"],["C5"],["C6"],["C7"],["C8"],["C9"]];
    colocarMatriz(posDivc,matrizC);

    let posDivd = [["D1"],["D2"],["D3"],["D4"],["D5"],["D6"],["D7"],["D8"],["D9"]];
    colocarMatriz(posDivd,matrizD);
    //
    var div2 = document.getElementById("boardManual");
    div2.style.display = "none";
    var div2 = document.getElementById("board");
    div2.style.display = "flex";
    
}
function cuadranteSacarTexto(cuadrante,Box){
    
}