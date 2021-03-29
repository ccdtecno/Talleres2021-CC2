let amplitude = 0;
let armonicos = 1;
let grafica;
let sliderArm, sliderAmp, sliderTime;

function setup() {
    let canvasDiv = document.getElementById('sketch');
    let cnv = createCanvas(canvasDiv.offsetWidth,canvasDiv.offsetHeight);
    cnv.parent('sketch');
    let centroCirculo = createVector(width * 0.2, height * 0.5);
    let inicioGrafica = createVector(width * 0.5, height * 0.5);
    grafica = new PloterFourier(centroCirculo, inicioGrafica, amplitude, armonicos);

    sliderArm = createSlider(1,30,1,1);
    // sliderVol.style('width: 392px');
    // sliderVol.style('transform: rotate(270deg)');
    // sliderArm.position(0,  height-sliderArm.width);

    sliderAmp = createSlider(0,150,0,1);
    // sliderAmp.style('transform: rotate(270deg)');

    sliderTime = createSlider(0.008,0.08,0.001,0.0001);
    // sliderTime.style('transform: rotate(270deg)');

    // print(sliderArm.parent());
    sliderArm.parent('sketch');
    sliderAmp.parent('sketch');
    sliderTime.parent('sketch');

    sliderArm.position(width*1/7-sliderArm.width/2,5);
    sliderAmp.position(width/2-sliderAmp.width/2,5);
    sliderTime.position(width*6/7-sliderTime.width/2,5);
    // sliderTime.style('transform: rotate(270deg)');
    // frameRate(10);
}

function draw() {
    background(13, 13, 13)
    fill(255);
    textSize(12)
    text("armónicos: "+ str(sliderArm.value()),width*1/7-sliderArm.width/4,40);
    text("amplitud: "+ str(sliderAmp.value()),width/2-sliderAmp.width/4,40);
    text("vel: "+ str(sliderTime.value()),width*6/7-sliderTime.width/4,40);
    
    grafica.setArmonicos(sliderArm.value());
    grafica.setAmp(sliderAmp.value());
    grafica.setTimeStep(sliderTime.value());
    // print(sliderTime.value());

    grafica.actualizar();
    // print(grafica.getArmonicos());
}


function keyPressed() {
    if(key == '1')
        grafica.changeFunction(1);
    if(key == '2')
        grafica.changeFunction(2);
    if(key == '3')
        grafica.changeFunction(3);
}