let c = [0, 30, 60, 80, 160, 240, 270, 330, 40, 56];
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ']
let notes = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];
let osc, env;
let delFeed, revbDecay;
let isPlaying = false;
let backColor;

function setup() {
  let cnv = createCanvas(500, 400);
  cnv.parent('sketch-container').mousePressed(toogleSystem);

  delFeed = createSlider(0,1,0.5,0.001);
  revbDecay = createSlider(0,1,0.5,0.001);

  delFeed.parent('sketch-info');
  revbDecay.parent('sketch-info');

  colorMode(HSB);
   x = width/10.5 
  env = new p5.Envelope(0.01, 0.1, 0.5, 0.9);
  osc = new p5.Oscillator('square');
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  delay.setType('pingPong'); 
  backColor = color(179,79,53);
  env.setInput(osc);
  reverb.process(osc, 5, 2);
  delay.process(osc, 0.5, 0.75);
}

function draw() {
  background(backColor);
  delay.drywet(delFeed.value());
  reverb.drywet(revbDecay.value());
  if(isPlaying) {
    noStroke();
    for(let i = 0; i < 10; i++) {
      fill(0, 0, 100);
      if(keyIsPressed) {
        if(key == keys[i]) {
          background(c[i], 50,200);
          fill(c[i], 100,c[i] + 20);
          osc.freq(midiToFreq(notes[i]))
          env.play();
        }
      }
      rect(width/32 + (x * i), height/4, width/10*.75, height*.65);
    }
    push();
    fill(0, 0, 183);
    textAlign(CENTER);
    textSize(36);
    text('toca el piano', width/2, 60);
    textSize(16);
    text('Delay: ' +  delFeed.value(), width*2/8, height-16);
    text('Reverb: ' +  revbDecay.value(), width*6/8, height-16);
    pop();
  } else {
    push();
    background(179,79,53);
    noStroke();
    fill(0, 0, 183);
    textAlign(CENTER);
    textSize(52);
    text('toca el canvas', width/2, height/2);
    pop();
  }
}

function toogleSystem() {
  if(isPlaying) {
    osc.stop;
    isPlaying = !isPlaying;
  } else {
    osc.start();
    isPlaying = !isPlaying;
  }
}