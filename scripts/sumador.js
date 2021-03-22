/*
    Este sketch funciona para visualizar la suma de senos con periodos en factor n
    Autor: soyuncitrico
    Email: 1darenastolteca@gmail.com
*/

let graficas = [];
let numGraficas = 20;
let factor = 0.6
let amplitude = 15;

function setup() {
    let cnv = createCanvas(800,800);
    cnv.parent('sketch');
    graficas = [numGraficas];
    let polarInit = createVector(amplitude*2,amplitude*2);
    let timeInit =  createVector(amplitude*6,amplitude*2)
    
    let centroPolar, initGrafica, y, yT;
    let amplitudeGraf = amplitude;
    
    for(let i = 0; i < numGraficas; i++) {
        // Calacula el centro del plotter polar y la grafica correspondiente en el tiempo
        let armonicos = i + 1;
        let y = polarInit.y + (i * amplitude * 2.2);
        let yT = timeInit.y + (i * amplitude * 2.2);
        centroPolar = createVector(polarInit.x,y);
        initGrafica = createVector(timeInit.x,yT);
        // almacena una nueva grafica que grafica el armonico final
        graficas[i] = new PloterFinalFourier(centroPolar, initGrafica, amplitudeGraf, armonicos);
        // se escala el valor de la amplitud para cada nuevo armonico
        amplitudeGraf = amplitudeGraf * factor
    }
    y = polarInit.y + (numGraficas * amplitude * 2.4);
    yT = timeInit.y + (numGraficas * amplitude * 2.4);
    centroPolar = createVector(polarInit.x,y);
    initGrafica = createVector(timeInit.x,yT);
    graficas[numGraficas] = new PloterFourier(centroPolar, initGrafica, amplitude, numGraficas);
    graficas[numGraficas].changeFunction(5);
    graficas[numGraficas].changeFactor(factor);
    // frameRate(10);   
}

function draw() {
    background(0);
    for(let i = 0; i < graficas.length; i++) {
        graficas[i].actualizar();       
    }
}


function keyPressed() {

}