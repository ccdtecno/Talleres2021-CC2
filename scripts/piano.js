let c = [0, 30, 60, 80, 160, 240, 270, 330, 40, 56];
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ']

let notes = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];

let x;
let osc, env;

let delFeed, delTime, revbDecay, revDura;

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch');

  btn = createButton("Start");
  btn.mousePressed(iniciaSistema);
  btn.parent('sketch');

  delFeed = createSlider(0,1,0,0.001);
  delTime = createSlider(0,2,0.5,0.001);
  
  revDura = createSlider(0,10,3,0.01);
  revbDecay = createSlider(0,100,2,1);

  delFeed.parent('sketch');
  delTime.parent('sketch');
  revDura.parent('sketch');
  revbDecay.parent('sketch');
    
  colorMode(HSB);
  background(179,79,53);
   x = width/10.5 
  env = new p5.Envelope(0.01, 0.1, 0.5, 0.9);
  osc = new p5.Oscillator('square');
  
  
  //osc.disconnect;
  
  //Aplicar Reverb
  reverb = new p5.Reverb();
  reverb.process(osc, 6,0.1);
  reverb.drywet();
  
  
  delay = new p5.Delay();
  delay.process(osc, 0.5, 0.5);
  delay.setType('pingPong'); 

//   amp = new p5.Amplitude();
  osc.amp(env);
   
  

}

function draw() {
  noStroke();
  delay.feedback(delFeed.value());
  delay.delayTime(delTime.value());
  reverb.set(revDura.value(),revbDecay.value());

  for(let i = 0; i < 10; i++) {

   fill(0, 0, 100);
    if(keyIsPressed && key == keys[i]) {
      background(c[i], 50,200);
      fill(c[i], 100,c[i] + 20);
      osc.freq(midiToFreq(notes[i]))
      env.play();   
    }
   rect(35 + (x*i), height/4, 50, height*.65);
  }
  
  fill(0, 0, 183);
   textSize(52);
   text('toca el piano', width/2 -150, 80);
}

// function keyPressed() {
// //   osc.start();
//   env.play();
// }

function iniciaSistema() {
    osc.start();
    env.play();
}

function actualizaColores() {

}