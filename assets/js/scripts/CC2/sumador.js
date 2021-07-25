var cnv;
    let graficas = [];
    let numGraficas = 6;
    let factor = 0.8
    let amplitude = 30;
    let sliderGraficas, sliderFactor, sliderAmplitude;

    function setup() {
        createCanvas(800,600).parent("sketch-container");
        graficas = [numGraficas];
        let polarInit = createVector(amplitude*4,amplitude*2);
        let timeInit =  createVector(amplitude*10,amplitude*2);
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
            // graficas[i].setArmonicos(sliderGraficas.value()); 
            // graficas[i].changeFactor(sliderFactor.value()); 
            // graficas[i].setAmp(sliderAmplitude.value()); 
            graficas[i].actualizar();              
        }             
    }