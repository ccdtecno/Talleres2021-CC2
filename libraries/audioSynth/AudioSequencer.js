class VoiceSynth {
   constructor() {
    // super();
    this.voice1 = new p5.MonoSynth();
    this.voice2 = new p5.MonoSynth();
    this.voice1.oscillator.setType('sawtooth');
    this.voice2.oscillator.setType('square');
    // print(this.voice1.oscillator.type);
    this.voice1.oscillator.freq(41.2);
    this.voice2.oscillator.freq(659.25);
    this.voice1.setADSR(0,1,.2,0.5);
    this.voice2.setADSR(0.1,1.2,.2,0.3);

    this.filtroLPF = new p5.Filter();
    this.filtroHPF = new p5.Filter();
    this.filtroHPF.setType('highpass');
    this.cutoff1 = 80;
    this.cutoff2 = 320;
    this.filtroLPF.freq(this.cutoff1);
    this.filtroHPF.freq(this.cutoff2);

    this.voice1.disconnect();
    this.voice2.disconnect();
    // this.filtroLPF.disconnect();
    // this.filtroLPF.disconnect();
    this.voice1.connect(this.filtro1);
    this.voice2.connect(this.filtro2);
    // this.filtroHPF.connect(this.filtro1);
    // this.filtroLPF.connect(this.filtro2);
    this.reverb = new p5.Reverb();
    this.reverb.process(this.filtroHPF, 3, 2);
   }
   
   setCutoffHPF(f) {
       this.cutoff2 = f;
       this.filtroHPF.freq(this.cutoff2);
   }

   setCutoffLPF(f) {
    this.cutoff1 = f;
    this.filtroLPF.freq(this.cutoff1);
   }
   
    voice1Play() {
       this.voice1.play();
   }

   voice1Stop() {
    this.voice1.stop();
   }

   voice2Play() {
       this.voice2.play();
   }

   voice2Stop() {
       this.voice2.stop();
   }

   voice2Stop() {
    this.voice2.stop();
    }
}