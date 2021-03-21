class ScreenPlotter {
    constructor(size, pos) {
        this.pos = pos;
        this.size = size;
        this.isLog = true;
        this.textColor;
        this.bNormalize = true;
        this.centerClip = false;
        this.finalPlot = p5.Vector.add(this.size, this.pos);
        this.fft = new p5.FFT();
        
    }

  
  texto() {
    // Texto de informacion
    noStroke();
    fill(textColor);
    // text(freq + '  Hz',width*2/5, 50);
    // text(vol + ' vol', width*3/5, 50);  
  }
    
  configEntrada(input) {
    this.fft.setInput(input);
  }  
  // Espectro de frecuencias
  plotFFT() {
    let spectrum = this.fft.analyze(1024);
    noStroke();
    for (let i = 0; i< spectrum.length; i++){
    let c = map(i,0, spectrum.length, 0,255)
    fill(c,255,255); //remove stroke(255);

    if(this.isLog) {
        let a = map(log(i), 0, log(spectrum.length), this.pos.x, this.finalPlot.x) 
        let b = map(spectrum[i], 0, 255, 0, this.size.y)
        rect(a, this.finalPlot.y, this.size.x / spectrum.length, -b)
        // fill(textColor);
        // text('LOG',width*3/4,50);

    } else {
        let a = map(i, 0, spectrum.length, this.pos.x, this.finalPlot.x);
        let b = map(spectrum[i], 0, 255, 0, this.size.y);
        rect(a, this.finalPlot.y, this.size.x / spectrum.length, -b )
        // fill(textColor);
        // text('LIN',width*3/4,50);
        } 
    }
    // push();
    //     strokeWeight(3);
    //     stroke(0,255,255);
    //     point(this.pos);
    //     point(this.size);
    //     pop();
  }
  
  plotWave() {
      // Forma de onda en el tiempo
      let waveform = this.fft.waveform(1024, 'float32');
      noFill();
      beginShape();
      stroke(100,255,255);
      for (let i = 0; i < waveform.length; i++) {
          let x = map(i, 0, waveform.length, this.pos.x, this.finalPlot.x);
          let y = map( waveform[i], -1, 1, this.pos.y, this.finalPlot.y);
          vertex(x,y);
        }
      endShape();
    }
    
    plotADSR() {
      // Forma de onda en el tiempo
      let waveform = this.fft.waveform(32, 'float32');
      noFill();
      beginShape();
      stroke(100,255,255);
      for (let i = 0; i < waveform.length; i++) {
          let x = map(i, 0, waveform.length, this.pos.x, this.finalPlot.x);
          let y = map( waveform[i], 1, 0, this.pos.y, this.finalPlot.y);
          vertex(x,y);
        }
      endShape();
    }

    plotCorrelation() {
        let corrBuff = autoCorrelate(waveform);
        beginShape();
        stroke(180,255,255);
        for (let i = 0; i < corrBuff.length; i++) {
            let w = map(i, 0, corrBuff.length, 0, width);
            let h = map(corrBuff[i], -1, 1, height/3, 0);
            curveVertex(w, h);
            }
        endShape();
    }

    autoCorrelate(buffer) {
        let newBuffer = [];
        let nSamples = buffer.length;
      
        let autocorrelation = [];
      
        // center clip removes any samples under 0.1
        if (this.centerClip) {
          let cutoff = 0.1;
          for (let i = 0; i < buffer.length; i++) {
            let val = buffer[i];
            buffer[i] = Math.abs(val) > cutoff ? val : 0;
          }
        }
      
        for (let lag = 0; lag < nSamples; lag++){
            let sum = 0; 
            for (let index = 0; index < nSamples; index++){
                let indexLagged = index+lag;
                if (indexLagged < nSamples) {
                    let sound1 = buffer[index];
                    let sound2 = buffer[indexLagged];
                    let product = sound1 * sound2;
                    sum += product;
                }
            }
            // average to a value between -1 and 1
            newBuffer[lag] = sum/nSamples;
        }
      
        if (this.bNormalize){
            let biggestVal = 0;
            for (let index = 0; index < nSamples; index++){
                if (abs(newBuffer[index]) > biggestVal){
                    biggestVal = abs(newBuffer[index]);
                }
            }
            for (let index = 0; index < nSamples; index++){
                newBuffer[index] /= biggestVal;
            }
        }
      
        return newBuffer;
      }
    
    changePlot() {
        this.isLog =! this.isLog;
    }
}