let amplitude = 0;
    let armonicos = 1;
    let grafica;
    let sliderArm, sliderAmp, sliderTime;

    function setup() {
        createCanvas(800,600).parent("sketch-container");
        let centroCirculo = createVector(width * 0.2, height * 0.5);
        let inicioGrafica = createVector(width * 0.5, height * 0.5);
        grafica = new PloterFourier(centroCirculo, inicioGrafica, amplitude, armonicos);

        sliderArm = createSlider(1,30,30,1).parent("sketch-container");
        // sliderVol.style('width: 392px');
        // sliderVol.style('transform: rotate(270deg)');
        // sliderArm.position(0,  height-sliderArm.width);

        sliderAmp = createSlider(0,150,100,1).parent("sketch-container");
        // sliderAmp.style('transform: rotate(270deg)');

        sliderTime = createSlider(0.008,0.2,0.1,0.0001).parent("sketch-container");
        // sliderTime.style('transform: rotate(270deg)');

        // print(sliderArm.parent());   
        sliderArm.position(width/7,80);
        sliderAmp.position(width/2, 80);
        sliderTime.position(width*6/7, 80);
        // sliderTime.style('transform: rotate(270deg)');
        // frameRate(10);
    }

    function draw() {
        background(13, 13, 13)
        fill(255);
        textSize(12);
        textAlign(CENTER);
        text("armónicos: "+ str(sliderArm.value()),width*1/7,60);
        text("amplitud: "+ str(sliderAmp.value()),width/2,60);
        text("vel: "+ str(sliderTime.value()),width*6/7, 60);
        
        grafica.setArmonicos(sliderArm.value());
        grafica.setAmp(sliderAmp.value());
        grafica.setTimeStep(sliderTime.value());
        // print(sliderTime.value());

        grafica.actualizar();
        // print(grafica.getArmonicos());
    }


function keyPressed() {
    let code = keyCode;
    // console.log(code);
    if(code == 49)
        grafica.changeFunction(1);
    if(code == 50)
        grafica.changeFunction(2);
    if(code == 51)
        grafica.changeFunction(3);
}    