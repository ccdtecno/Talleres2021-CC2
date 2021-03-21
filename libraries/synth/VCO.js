class VCO {
  constructor(_type,_frecuency,_volume, _pos = createVector(0,0), _size = createVector(300,150), _synthMode = 'osc') {
      this.type = _type;
      this.frecuency = _frecuency;
      this.vol = _volume;
      this.pos = _pos;
      this.size = _size;
      this.finalPos = p5.Vector.add(_pos,_size);
      this.plotWave = true;
      
      // si el _synthMode == osc
      
      this.osc = new p5.Oscillator();

      this.sliderVol = createSlider(0,1,0,0.01);
      let sliderPosX = map(this.size.x*0.725, 0,this.size.x,this.pos.x,this.finalPos.x);
      let sliderPosY = map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y); 
      this.sliderVol.style('transform: rotate(270deg)');
      this.sliderVol.position(sliderPosX,sliderPosY);


      this.sliderFreq = createSlider(0,200,50,0.1);
      this.sliderFreq.style('width: 245px');
      sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
      sliderPosY = map(this.size.y*0.05, 0,this.size.y,this.pos.y,this.finalPos.y); 
      this.sliderFreq.position(sliderPosX,sliderPosY);
      
      this.sliderPan = createSlider(-1,1,0,0.01);
      this.sliderPan.style('width: 245px');
      sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
      sliderPosY = map(this.size.y*0.8, 0,this.size.y,this.pos.y,this.finalPos.y); 
      this.sliderPan.position(sliderPosX,sliderPosY);

      this.osc.setType(this.type);     
      this.osc.freq(this.frecuency)
      this.osc.amp(this.vol);

      // posiciona la screen y el sliderVolumen
      let posPlotter = createVector(this.pos.x + this.size.x * 0.07,this.pos.y + this.size.y*0.25);
      let sizePlotter = createVector(this.size.x*.8,this.size.y*.5);
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
    let freq = this.logslider(this.sliderFreq.value(), 0,200,20,20000);
    let vol = this.sliderVol.value();
    let pan = this.sliderPan.value();
    this.osc.freq(freq);
    this.osc.amp(vol);
    this.osc.pan(pan);
  }

  dibuja() {
    this.actualiza();
    push();
    noStroke();
    fill(0);
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
    pop();

    if(this.plotWave) {
        // this.screen.plotWave(this.fft);
        this.screen.plotWave();
      } else {
        // this.screen.plotFFT(this.fft);
        this.screen.plotFFT();
      }
  }
  
}


class PWM {
  constructor(_frecuency,_volume, _pos = createVector(0,0), _size = createVector(300,150), ) {
      this.type = 'square';
      this.frecuency = _frecuency;
      this.vol = _volume;
      this.pos = _pos;
      this.size = _size;
      this.finalPos = p5.Vector.add(_pos,_size);
      this.plotWave = true;
      this.pwm = 50;
    
      this.osc = new p5.Pulse();
      

      this.sliderVol = createSlider(0,1,0,0.01);
      this.sliderVol.style('transform: rotate(270deg)');
      let sliderPosX = map(-60, 0,this.size.x,this.pos.x,this.finalPos.x);
      let sliderPosY = map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y);       
      this.sliderVol.position(sliderPosX,sliderPosY);

      this.sliderPWM = createSlider(0,1,0.5,0.01);
      this.sliderPWM.style('transform: rotate(270deg)');
      sliderPosX = map(this.finalPos.x*0.37,0,this.size.x,this.pos.x,this.finalPos.x);
      sliderPosY = map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y);       
      this.sliderPWM.position(sliderPosX,sliderPosY);


      this.sliderFreq = createSlider(0,200,50,0.1);
      this.sliderFreq.style('width: 245px');
      sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
      sliderPosY = map(this.size.y*0.05, 0,this.size.y,this.pos.y,this.finalPos.y); 
      this.sliderFreq.position(sliderPosX,sliderPosY);
      
      this.sliderPan = createSlider(-1,1,0,0.01);
      this.sliderPan.style('width: 245px');
      sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
      sliderPosY = map(this.size.y*0.8, 0,this.size.y,this.pos.y,this.finalPos.y); 
      this.sliderPan.position(sliderPosX,sliderPosY);

      // this.osc.setType(this.type);     
      this.osc.freq(this.frecuency)
      this.osc.amp(this.vol);

      let posPlotter = createVector(this.pos.x + this.size.x * 0.07,this.pos.y + this.size.y*0.4);
      // let sizePlotter = createVector(this.size.x*.8,this.size.y*.5);
      // let posPlotter = createVector(this.pos.x + this.size.x * 0.080,this.pos.y + this.size.y*0.05);
      let sizePlotter = createVector(this.size.x*0.82,this.size.y*.25);
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
    let freq = this.logslider(this.sliderFreq.value(), 0,200,20,20000);
    let vol = this.sliderVol.value();
    let pan = this.sliderPan.value();
    let ancho = this.sliderPWM.value();
    this.osc.freq(freq);
    this.osc.amp(vol);
    this.osc.pan(pan);
    this.osc.width(ancho);
  }

  dibuja() {
    this.actualiza();
    push();
    noStroke();
    fill(0);
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
    pop();

    if(this.plotWave) {
        // this.screen.plotWave(this.fft);
        this.screen.plotWave();
      } else {
        // this.screen.plotFFT(this.fft);
        this.screen.plotFFT();
      }
  }
  
}





  


  