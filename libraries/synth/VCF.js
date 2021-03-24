class VCF {
    constructor(_type,_frecuency,_res, _pos = createVector(0,0), _size = createVector(300,150), _synthMode = 'osc') {
        this.type = _type;
        this.frecuency = _frecuency;
        this.res = _res;
        this.pos = _pos;
        this.size = _size;
        this.finalPos = p5.Vector.add(_pos,_size);
        this.plotWave = true;
        this.gain = 1;
        // si el _synthMode == osc
        
        this.filter = new p5.Filter();
  
        // this.sliderGain = createSlider(0,1,0,0.01);
        let sliderPosX = map(this.size.x*0.725, 0,this.size.x,this.pos.x,this.finalPos.x);
        let sliderPosY = map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y); 
        // this.sliderGain.style('transform: rotate(270deg)');
        // this.sliderGain.position(sliderPosX,sliderPosY);
  
  
        this.sliderFreq = createSlider(0,200,200,0.1);
        this.sliderFreq.style('width: 245px');
        sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
        sliderPosY = map(this.size.y*0.05, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderFreq.position(sliderPosX,sliderPosY);
        
        this.sliderRes = createSlider(0,1,0,0.001);
        this.sliderRes.style('width: 245px');
        sliderPosX = map(this.size.x*0.05, 0,this.size.x,this.pos.x,this.finalPos.x); 
        sliderPosY = map(this.size.y*0.8, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderRes.position(sliderPosX,sliderPosY);
  
        this.filter.setType(this.type);     
        this.filter.freq(this.frecuency)
        // this.filter.gain(this.vol);
  
        // posiciona la screen y el sliderVolumen
        let posPlotter = createVector(this.pos.x + this.size.x * 0.07,this.pos.y + this.size.y*0.25);
        let sizePlotter = createVector(this.size.x*.8,this.size.y*.5);
        this.screen = new ScreenPlotter(sizePlotter,posPlotter);
        this.screen.configEntrada(this.filter);
        
    }
  
    getFilter() {
      return this.filter;
    }
  
    unplugged() {
      this.filter.disconnect();
    }
  
    plug(sound) {
      this.filter.connect(sound);
    }
    filterToggle() {
      this.filter.toggle();
    }
  
    setScreen() {
      this.screen.configEntrada(this.filter);
    }
  
    
    setFreq(freq) {
      this.frecuency = freq;
      this.filter.freq(this.frecuency);
    }
  
    setFreqMod(freq) {
      this.filter.freq(freq);
    }
    setGain(gain) {
        this.gain = gain;
        this.filter.gain(this.gain);
    }
  
    setRes(res) {
        this.res = res;
      this.filter.pan(this.res);
    }
    
    changeWave() {
      this.plotWave =! this.plotWave;
      // print(this.plotWave);
    }
    changeMode() {
        this.screen.changePlot();
    }
  
    changeFilter(typeFilter) {
      switch(typeFilter) {
          case 'lowpass':
              this.filter.setType(typeFilter);
              break;
          case 'highpass':
              this.filter.setType(typeFilter);
              break;
          case 'bandpass':
              this.filter.setType(typeFilter);
              break;
          case 'lowshelf':
              this.filter.setType(typeFilter);
              break;
          case 'highshelf':
              this.filter.setType(typeFilter);
              break;
          case 'peaking':
              this.filter.setType(typeFilter);
              break;
          case 'notch':
                this.filter.setType(typeFilter);
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
      // let gain = this.sliderGain.value();
      let res = this.logslider(this.sliderRes.value(),0,1,1,1000);
      this.filter.freq(freq);
      // this.filter.gain(gain);
      this.filter.res(res);
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

    actualizaMod(mod) {
      let freqSlider = this.logslider(this.sliderFreq.value(), 0,200,20,20000);
      let gain = this.sliderGain.value();
      let res = this.logslider(this.sliderRes.value(),0,1,1,1000);
      // freq += mod;
      this.filter.freq(mod.add(freqSlider));
      this.filter.gain(gain);
      this.filter.res(res);
    }
  
    dibujaMod(mod) {
      this.actualizaMod(mod);
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
  
  
  
    
  
  
    