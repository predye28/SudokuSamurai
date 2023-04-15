window.onload = function(){
    startGame();
    createTableManual();
    var div = document.getElementById("boardManual");
    div.style.display = "none";
}
var countIdCelda = 0
var boxTransparent= [3,10,21,22,26,27,38,45]
var boxCorner = [16,18,30,32]

function startGame(){
    //CREAR TABLERO 9X9
    for (var i=0;i<49;i++){//cantidad de box
        let idCelda = 1;
            if(boxTransparent.includes(i)){//box transparente y la ignoramos
                document.getElementsByClassName("box")[i].classList.add("boxTransparent");
            }else if(boxCorner.includes(i)){
                document.getElementsByClassName("box")[i].innerHTML="<div id='"+(idCelda)+"' class='cell cellCorner'></div><div id='"+(idCelda+1)+"' class='cell cellCorner'></div><div id='"+(idCelda+2)+"' class='cell cellCorner'></div><div id='"+(idCelda+3)+"' class='cell cellCorner'></div><div id='"+(idCelda+4)+"' class='cell cellCorner'></div><div id='"+(idCelda+5)+"' class='cell cellCorner'></div><div id='"+(idCelda+6)+"' class='cell cellCorner'></div><div id='"+(idCelda+7)+"' class='cell cellCorner'></div><div id='"+(idCelda+8)+"' class='cell cellCorner'></div>"                
                countIdCelda += 9;
            }else{
                document.getElementsByClassName("box")[i].innerHTML="<div id='"+(idCelda)+"' class='cell'></div><div id='"+(idCelda+1)+"' class='cell'></div><div id='"+(idCelda+2)+"' class='cell'></div><div id='"+(idCelda+3)+"' class='cell'></div><div id='"+(idCelda+4)+"' class='cell'></div><div id='"+(idCelda+5)+"' class='cell'></div><div id='"+(idCelda+6)+"' class='cell'></div><div id='"+(idCelda+7)+"' class='cell'></div><div id='"+(idCelda+8)+"' class='cell'></div>"
                //readonly para q no pueda ingresar valores
                countIdCelda += 9;
            }            
    }

}


function posicionDelCuadranteEnElCentral(nombreMatriz,posicion){
    let fila = posicion[0][0];
    let columna = posicion[1][0];
    if(nombreMatriz =="B"){
        if(fila==6){
            return [0,columna+6];
        }
        
        if(fila==7){
            return [1,columna+6];
        }
        
        if(fila==8){
            return [2,columna+6];
        }
    }
    if(nombreMatriz =="C"){
        if(fila==0){
            return [6,columna-6];
        }
        
        if(fila==1){
            return [7,columna-6];
        }
        
        if(fila==2){
            return [8,columna-6];
        }
    }
    if(nombreMatriz =="D"){
        if(fila==0){
            return [6,columna+6];
        }
        
        if(fila==1){
            return [7,columna+6];
        }
        
        if(fila==2){
            return [8,columna+6];
        }
    }
}






