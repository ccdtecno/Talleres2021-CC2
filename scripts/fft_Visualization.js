let button;
let jumButton;

let song, fft, mic;
let bNormalize = true;
let centerClip = false;

let audioIsPlaying = false;

function preload(){
  song = loadSound('songs/synth.mp3');
}


function setup() {
  let cnv = createCanvas(700, 700);
  cnv.parent('sketch')
  angleMode(DEGREES);
  colorMode(HSB);
  rectMode(CENTER); 
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);
  mic = new p5.AudioIn();
  song.play();
  audioIsPlaying = true;
  fft = new p5.FFT(0.6,64);
  
  color_back = color(191, 98, 15);
  color_1 = color(169, 88, 55);
  color_2 = color (169, 83, 85);
  color_3 = color(45, 91, 95);
  color_4 = color(39, 94, 75);
  nZ = random(10);
  nZstroke = random();
  aumentoStroke = 0.3;
  // background(0);
  background(color_back);
  
}

function draw() {
  
  background(191, 98, 15, 0.2);

  // Correlation, dibuja las curva amarillas de la parte superior
  let timeDomain = fft.waveform(1024, 'float32');
  let corrBuff = autoCorrelate(timeDomain);
  
  stroke(color_4);
  noFill();
  beginShape();
  for (let i = 0; i < corrBuff.length; i++) {
    let w = map(i, 0, corrBuff.length, 0, width);
    let h = map(corrBuff[i], -1, 1, 150, 0);
    curveVertex(w, h);
  }
  endShape();
  
  beginShape();
  for (let i = 0; i < corrBuff.length; i++) {
    let w = map(i, 0, corrBuff.length, width, 0);
    let h = map(corrBuff[i], -1, 1, 150, 0);
    curveVertex(w, h);
  }
  endShape();  
  noFill();
  translate(width/2, height*3/4);
  

  let spectrum = fft.analyze();
  beginShape();
  for(let i = spectrum.length / 4; i < spectrum.length - 9; i++) {
    let r = map(spectrum[i], 0, 255, 10, width*3/4);
    let angle = map(i, spectrum.length / 4, spectrum.length - 9, 150, 390);
    let x = r * cos(angle);
    let y = r * sin(angle);
    nZstroke = noise(nZstroke);
    strokeWeight(3 * nZstroke);
    stroke(color_1);
    fill(color_2);
    if(i >= spectrum.length/2 && i <= spectrum.length/2 + spectrum.length/16 + spectrum.length/32) {
      // noStroke();
      strokeWeight(5 * nZstroke);
      stroke(45, 91, 95, 0.5);
      point(-x,-y/3);  
      // rect(-x,-y/2.5,r/10);  
      stroke(color_2);
      fill(color_1);
    }
    rect(x,y,r/10);
    nZstroke += aumentoStroke;
    }
  fill(color_back);
  strokeWeight(2*random());
  stroke(color_3);
  ellipse(0,0,map(spectrum[1],0,255,10,width/5));
  endShape();
}

function autoCorrelate(buffer) {
  let newBuffer = [];
  let nSamples = buffer.length;

  let autocorrelation = [];

  // center clip removes any samples under 0.1
  if (centerClip) {
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
      if (indexLagged < nSamples){
        let sound1 = buffer[index];
        let sound2 = buffer[indexLagged];
        let product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    newBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
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

// toggle input
function keyPressed() {
  if (key == 't') {
    toggleInput();
  }
}

function toggleInput() {
  if (audioIsPlaying ) {
    song.pause();
    mic.start();
    fft.setInput(mic);
    audioIsPlaying = false;
  } else {
    song.play();
    mic.stop();
    fft.setInput(song);
    audioIsPlaying = true;
  }
}

function toggleSong(){
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}

function jumpSong() {
  let len = song.duration();
  let t = random(len);
  song.jump(t);
}
