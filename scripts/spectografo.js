let amplitude = 0;
let armonicos = 1;
let grafica;
let sliderArm, sliderAmp, sliderTime;

function setup() {
    let cnv =createCanvas(800,500);
    // cnv.parent('sketch');
    let centroCirculo = createVector(width * 0.2, height * 0.5);
    let inicioGrafica = createVector(width * 0.5, height * 0.5);
    grafica = new PloterFourier(centroCirculo, inicioGrafica, amplitude, armonicos);

    sliderArm = createSlider(1,30,1,1);
    sliderArm.style('transform: rotate(270deg)');
    // sliderVol.style('width: 392px');
    // sliderVol.style('transform: rotate(270deg)');
    // sliderVol.position(width-205,  height*3 /9 );

    sliderAmp = createSlider(0,100,0,1);
    sliderAmp.style('transform: rotate(270deg)');

    sliderTime = createSlider(0.008,0.08,0.001,0.0001);
    sliderTime.style('transform: rotate(270deg)');
    // frameRate(10);
}

function draw() {
    grafica.setArmonicos(sliderArm.value());
    grafica.setAmp(sliderAmp.value());
    grafica.setTimeStep(sliderTime.value());
    print(sliderTime.value());

    grafica.actualizar();
    print(grafica.getArmonicos());
}


function keyPressed() {
    if(key == '1')
        grafica.changeFunction(1);
    if(key == '2')
        grafica.changeFunction(2);
    if(key == '3')
        grafica.changeFunction(3);
}