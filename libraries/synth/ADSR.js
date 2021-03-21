class ADSR {
    constructor(_a,_d,_s,_r, _pos = createVector(0,0), _size = createVector(300,150)) {
        this.a = _a;;
        this.d = _d;
        this.s = _s;
        this.r = _r,
        this.pos = _pos;
        this.size = _size;
        this.finalPos = p5.Vector.add(_pos,_size);
        
        this.gain = 1;
        // si el _synthMode == osc
        
        this.env = new p5.Envelope(this.a,1,this.d,this.s,this.r,0);
  
        let sliderPosX = map(-this.pos.x*0.175, 0,this.size.x,this.pos.x,this.finalPos.x);
        let sliderPosY = map(this.size.y*0.45, 0,this.size.y,this.pos.y,this.finalPos.y); 
        this.sliderAttack = createSlider(0,2,0,0.01);
        this.sliderAttack.style('transform: rotate(270deg)');
        this.sliderAttack.position(sliderPosX,sliderPosY);
  
        sliderPosX = map(-this.pos.x*.075, 0,this.size.x,this.pos.x,this.finalPos.x);
        this.sliderDecay = createSlider(0,2,0,0.01);
        this.sliderDecay.style('transform: rotate(270deg)');
        this.sliderDecay.position(sliderPosX,sliderPosY);
        
        sliderPosX = map(this.pos.x*0.025, 0,this.size.x,this.pos.x,this.finalPos.x);
        this.sliderSustain = createSlider(0,1,1,0.01);
        this.sliderSustain.style('transform: rotate(270deg)');
        this.sliderSustain.position(sliderPosX,sliderPosY);

        sliderPosX = map(this.pos.x*0.125, 0,this.size.x,this.pos.x,this.finalPos.x);        
        this.sliderRelease = createSlider(0,2,0,0.01);
        this.sliderRelease.style('transform: rotate(270deg)');
        this.sliderRelease.position(sliderPosX,sliderPosY);
  
  
        // posiciona la screen
        let posPlotter = createVector(this.pos.x + this.size.x * 0.4,this.pos.y + this.size.y*0.25);
        let sizePlotter = createVector(this.size.x*.5,this.size.y*.5);
        this.screen = new ScreenPlotter(sizePlotter,posPlotter);
        this.screen.configEntrada(this.env);
        
    }

    setScreen() {
        this.screen.configEntrada(this.osc);
      }
    
  
    getEnvelope() {
      return this.env;
    }
  
    unplugged() {
      this.env.disconnect();
    }
  
    plug(sound) {
      this.env.connect(sound);
    }
    
    play(sound) {
      
      this.env.play(sound);
    }

    triggerA(sound) {
        this.env.triggerAttack(sound);
    }
    
    triggerR(sound) {
        this.env.triggerRelease(sound);
    }
    
    triggerAD(sound) {
        this.env.ramp(sound,0,this.sliderAttack.value(),this.sliderSustain.value());
    }

    changeType(type) {
      switch(type) {
          case 'log':
              this.env.setExp(true);
              break;
          case 'lin':
              this.env.setExp(false);
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
      let attack = this.sliderAttack.value();
      let decay = this.sliderDecay.value();
      let sustain = this.sliderSustain.value();
      let release = this.sliderRelease.value();
      
      this.env.setADSR(attack,decay,sustain,release);
      
    }


  
    dibuja() {
      this.actualiza();
      push();
      noStroke();
      fill(0);
      rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
      pop();
  
      this.screen.plotADSR();

    }
    
    dibujaAD() {
        this.actualiza();
        // this.sliderSustain.hide();
        this.sliderRelease.hide();
        push();
        noStroke();
        fill(0);
        rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        pop();
    
        this.screen.plotADSR();
  
    }
  }
  
  
  
    
  
  
    