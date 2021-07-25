import "../globals";
const sketch = (p5) => {
  let vco1;
  let isRunning = false;
  // vco2, filter;
  // let adsr;
  // let textColor;
  // let modLFO;
  // let lfoState = false;

  p5.setup = () => {
    // console.log(p5);
    p5.createCanvas(800, 600).mousePressed(() => {
      if (isRunning) this.osc.stop();
      else this.osc.start();
      isRunning = !isRunning;
    });
    p5.colorMode(p5.HSB);
    // textColor = p5.color(160, 255, 80);
    let posVCO = p5.createVector(0, 0);
    // let posVCO2 = createVector(width/2, 0);
    // let posVCF = createVector(0,300);
    // let posADSR = createVector(width/2,300);
    let sizeVCO = p5.createVector(300, 300);

    vco1 = new VCO("sine", 440, 0.2, posVCO, sizeVCO);
    // vco2 = new PWM(440,0.2,posVCO2,sizeVCO);
    // filter = new VCF('lowpass',20000,1,posVCF,sizeVCO);
    // adsr = new ADSR(0,0.1,0.5,0.3,posADSR,sizeVCO);
    //
    // vco1.sliderVol.parent('sketch');
    // vco1.sliderFreq.parent('sketch');
    // vco1.sliderPan.parent('sketch');
    //
    // vco2.sliderVol.parent('sketch');
    // vco2.sliderFreq.parent('sketch');
    // vco2.sliderPan.parent('sketch');
    // vco2.sliderPWM.parent('sketch');
    //
    // filter.sliderFreq.parent('sketch');
    // filter.sliderRes.parent('sketch');
    // filter.sliderGain.parent('sketch');
    //
    // adsr.sliderAttack.parent('sketch');
    // adsr.sliderDecay.parent('sketch');
    // adsr.sliderSustain.parent('sketch');
    // adsr.sliderRelease.parent('sketch');
    //
    // vco1.unplugged();
    // vco2.unplugged();
    //
    // vco1.setScreen();
    // vco2.setScreen();
    // filter.setScreen();
    //
    // vco1.plug(filter.getFilter());
    // vco2.plug(filter.getFilter());
    //   filter.unplugged();
    //
    // filter.plug();
    // modLFO = lfo.getLFO();
    // console.log(window.p5);
    // console.log(sketch);
  };

  p5.draw = () => {
    if (isRunning) {
      p5.background(30);
      // vco1.actualiza();
      vco1.dibuja();
      // vco2.actualiza();
      // vco2.dibuja();
      // filter.actualiza();
      // print(lfo.getAmp());
      // filter.dibuja();
      // filter.dibujaMod(lfo.getLFO());
      // filter.setFreq(ad.getEnvelope());
      // adsr.actualiza();
      // adsr.dibuja();
    } else {
      p5.push();
      p5.background(0);
      p5.textAlign(p5.CENTER);
      p5.textSize(24);
      p5.noStroke();
      p5.fill(255);
      p5.text("Presiona el canvas para empezar", p5.width / 2, p5.height / 2);
      p5.pop();
    }
  };

  p5.keyPressed = () => {
    let key = p5.key;
    if (key == "1") {
      vco1.changeVoice("sine");
    }
    if (key == "2") {
      vco1.changeVoice("triangle");
    }
    if (key == "3") {
      vco1.changeVoice("square");
    }
    if (key == "4") {
      vco1.changeVoice("sawtooth");
    }
    if (key == "8") {
      // vco2.changeVoice('triangle')
    }
    if (key == "9") {
      // vco2.changeVoice('square')
    }
    if (key == "0") {
      // vco2.changeVoice('sawtooth')
    }
    if (key == "w") {
      vco1.changeWave();
      // vco2.changeWave();
      // filter.changeWave();
    }

    if (key == "q") {
      // vco2.changeMode();
      vco1.changeMode();
      // filter.changeMode();
      // print(screen.isLog);
    }

    if (key == "a") {
      vco1.oscStart();
      // vco2.oscStart();
    }
    if (key == "s") {
      vco1.oscStop();
      // vco2.oscStop();
    }
    // if (key == "j") {
    // }
    if (key == "k") {
      // vco2.oscStop();
    }
    if (key == "t") {
      // adsr.play(filter.getFilter());
      // print('Press T');
    }
    if (key == "g") {
      // adsr.triggerA(filter.getFilter());
    }
    if (key == "z") {
      // filter.changeFilter('lowpass');
      // print('LowPassFilter');
    }
    if (key == "x") {
      // filter.changeFilter('highpass');
      // print('HighPassFilter');
    }
    if (key == "c") {
      // filter.changeFilter('bandpass');
      // print('BandPassFilter');
    }
    // if(key == 'v') {
    //   filter.changeFilter('lowshelf');
    // }
    // if(key == 'b') {
    //   filter.changeFilter('highshelf');
    // }
    // if(key == 'n') {
    //   filter.changeFilter('peaking');
    // }
    // if(key == 'm') {
    //   filter.changeFilter('notch');
    // }
    if (key == ",") {
      // filter.filterToggle();
      // print('Toogle Filtro');
    }
  };

  p5.keyReleased = () => {
    if (p5.key == "g") {
      // adsr.triggerR(filter.getFilter());
    }
  };
  // p5.mouseClicked = () => {}
  // p5.mousePressed = () => {}
  // p5.mouseReleased = () => {}
  /*eslint-disable*/
  class VCO {
    constructor(_type,_frecuency,_volume, _pos = p5.createVector(0,0), _size = p5.createVector(300,150), _synthMode = 'osc') {
        this.type = _type;
        this.frecuency = _frecuency;
        this.vol = _volume;
        this.pos = _pos;
        this.size = _size;
        this.finalPos = p5.constructor.Vector.add(_pos,_size);
        this.plotWave = true;
        
        this.osc = new p5.constructor.Oscillator();
        console.log(this.osc);
  
        this.sliderVol = p5.createSlider(0,1,0.1,0.01);
        let sliderPosX = p5.map(this.size.x*0.725, 0,this.size.x,this.pos.x,this.finalPos.x);
        let sliderPosY = p5.map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderVol.style('transform: rotate(270deg)');
        this.sliderVol.position(sliderPosX,sliderPosY);
  
  
        this.sliderFreq = p5.createSlider(0,200,50,0.1);
        this.sliderFreq.style('width: 245px');
        sliderPosX = p5.map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
        sliderPosY = p5.map(this.size.y*0.05, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderFreq.position(sliderPosX,sliderPosY);
        
        this.sliderPan = p5.createSlider(-1,1,0,0.01);
        this.sliderPan.style('width: 245px');
        sliderPosX = p5.map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
        sliderPosY = p5.map(this.size.y*0.8, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderPan.position(sliderPosX,sliderPosY);
  
        this.osc.setType(this.type);     
        this.osc.freq(this.frecuency)
        this.osc.amp(this.vol);
        this.f = this.osc.freq.bind(window);
  
        // posiciona la screen y el sliderVolumen
        let posPlotter = p5.createVector(this.pos.x + this.size.x * 0.07,this.pos.y + this.size.y*0.25);
        let sizePlotter = p5.createVector(this.size.x*.8,this.size.y*.5);
        this.screen = new ScreenPlotter(sizePlotter,posPlotter);
        this.screen.configEntrada(this.osc);
        
    }
    
    setScreen() {
      this.screen.configEntrada(this.osc);
    }
  
    getSound() {
      return this.osc;
    }
  
    unplugged() {
      this.osc.disconnect();
    }
  
    plug(sound) {
      this.osc.connect(sound);
    }
    oscStart() {
      this.osc.start();
    }
  
    oscStop() {
      // this.osc.amp(0,1);
      this.osc.stop();
    }
    
    setFreq(freq) {
      this.frecuency = freq;
      this.osc.freq(this.frecuency);
    }
  
    setVolume(vol) {
        this.vol = vol;
        this.osc.amp(this.vol);
    }
  
    setPan(pan) {
      this.osc.pan(pan);
    }
  
    setPhase(phase) {
        this.osc.phase(phase);
    }
    
    changeWave() {
      this.plotWave =! this.plotWave;
      // print(this.plotWave);
    }
    changeMode() {
        this.screen.changePlot();
    }
  
    changeVoice(wave) {
      switch(wave) {
          case 'sine':
              this.osc.setType('sine');
              break;
          case 'triangle':
              this.osc.setType('triangle');
              break;
          case 'square':
              this.osc.setType('square');
              break;
          case 'sawtooth':
              this.osc.setType('sawtooth');
              break;
      }
    }
  
    logslider(position, min ,max, minLog, maxLog) {
      var minp = min;
      var maxp = max;
      var minv = Math.log(minLog);
      var maxv = Math.log(maxLog);
      var scale = (maxv-minv) / (maxp-minp);
    
      return Math.exp(minv + scale*(position-minp));
    }
  
    // Sliders
    actualiza() {
      let f = this.logslider(this.sliderFreq.value(), 0,200,20,20000);
      // let vol = this.sliderVol.value();
      // let pan = this.sliderPan.value();
      // this.osc.freq(f);
      this.f(f);
      // this.osc.amp(vol);
      // this.osc.pan(pan);
    }
  
    dibuja = () => {
      this.actualiza();
      p5.push();
      p5.noStroke();
      p5.fill(0);
      p5.rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
      p5.pop();
  
      if(this.plotWave) {
          // this.screen.plotWave(this.fft);
          this.screen.plotWave();
        } else {
          // this.screen.plotFFT(this.fft);
          this.screen.plotFFT();
        }
    } 
  }

  class ScreenPlotter {
    constructor(size, pos) {
        this.pos = pos;
        this.size = size;
        this.isLog = true;
        this.textColor;
        this.bNormalize = true;
        this.centerClip = false;
        this.finalPlot = p5.constructor.Vector.add(this.size, this.pos);
        this.fft = new p5.constructor.FFT();
    }
  
  texto() {
    // Texto de informacion
    p5.noStroke();
    p5.fill(textColor);
    // text(freq + '  Hz',width*2/5, 50);
    // text(vol + ' vol', width*3/5, 50);  
  }
    
  configEntrada(input) {
    this.fft.setInput(input);
  }  
  // Espectro de frecuencias
  plotFFT = () => {
    let spectrum = this.fft.analyze(1024);
    console.log(spectrum);
    p5.noStroke();
    for (let i = 0; i< spectrum.length; i++){
    let c = p5.map(i,0, spectrum.length, 0,255)
    p5.fill(c, 255, 255); //remove stroke(255);

    if(this.isLog) {
        let a = p5.map(p5.log(i), 0, p5.log(spectrum.length), this.pos.x, this.finalPlot.x) 
        let b = p5.map(spectrum[i], 0, 255, 0, this.size.y)
        p5.rect(a, this.finalPlot.y, this.size.x / spectrum.length, -b)
        // p5.fill(textColor);
        // p5.text('LOG',width*3/4,50);

    } else {
        let a = p5.map(i, 0, spectrum.length, this.pos.x, this.finalPlot.x);
        let b = p5.map(spectrum[i], 0, 255, 0, this.size.y);
        p5.rect(a, this.finalPlot.y, this.size.x / spectrum.length, -b )
        // p5.fill(textColor);
        // p5.text('LIN',width*3/4,50);
        } 
    }
    // p5.push();
    //     p5.strokeWeight(3);
    //     p5.stroke(0,255,255);
    //     p5.point(this.pos);
    //     p5.point(this.size);
    //     p5.pop();
  }
  
  plotWave() {
      // Forma de onda en el tiempo
      let waveform = this.fft.analyze.call(this.window);
      console.log(waveform);
      p5.noFill();
      p5.beginShape();
      p5.stroke(100, 255, 255);
      for (let i = 0; i < waveform.length; i++) {
          let x = p5.map(i, 0, waveform.length, this.pos.x, this.finalPlot.x);
          let y = p5.map( waveform[i], -1, 1, this.pos.y, this.finalPlot.y);
          p5.vertex(x,y);
        }
      p5.endShape();
    }
    
    plotADSR() {
      // Forma de onda en el tiempo
      let waveform = this.fft.waveform(32, 'float32');
      p5.noFill();
      p5.beginShape();
      p5.stroke(100,255,255);
      for (let i = 0; i < waveform.length; i++) {
          let x = p5.map(i, 0, waveform.length, this.pos.x, this.finalPlot.x);
          let y = p5.map( waveform[i], 1, 0, this.pos.y, this.finalPlot.y);
          p5.vertex(x,y);
        }
      p5.endShape();
    }

    plotCorrelation() {
        let corrBuff = autoCorrelate(waveform);
        p5.beginShape();
        p5.stroke(180,255,255);
        for (let i = 0; i < corrBuff.length; i++) {
          let w = p5.map(i, 0, corrBuff.length, 0, width);
          let h = p5.map(corrBuff[i], -1, 1, height/3, 0);
          p5.curveVertex(w, h);
        }
        p5.endShape();
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
                if (p5.abs(newBuffer[index]) > biggestVal){
                    biggestVal = p5.abs(newBuffer[index]);
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
};
export default sketch;
