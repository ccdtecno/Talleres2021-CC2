let button, jumButton, stopButton;
let sliderVol, sliderRate;

let song, fft, mic;
let bNormalize = true;
let centerClip = false;

let audioInput = false;
let isPlaying = false;

function preload(){
  song = loadSound('../assets/js/scripts/CC2/synth.mp3');
}


function setup() {
  getAudioContext().suspend();
  let cnv = createCanvas(800,600);
  cnv.parent('sketch-container')
  angleMode(DEGREES);
  colorMode(HSB);
  rectMode(CENTER); 

  // Creacion de botones 
  button = createButton('Play / Pause');
  button.mousePressed(toggleSong);
  stopButton = createButton('Stop');
  stopButton.mousePressed(alto);
  jumpButton = createButton("Random");
  jumpButton.mousePressed(jumpSong);

  // Creacion de sliders
  sliderVol = createSlider(0,1,0.5,0.001)
  sliderRate = createSlider(0,2,1,0.001)
  button.parent('sketch-info');
  stopButton.parent('sketch-info');
  jumpButton.parent('sketch-info');
  sliderVol.parent('sketch-info');
  sliderRate.parent('sketch-info');
  
  mic = new p5.AudioIn();
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
  if (isPlaying) {
    //  Actualizacion de los sliders
    song.setVolume(sliderVol.value());
    song.rate(sliderRate.value());  
    ilustrar();
  } else {
    push();
    background(0);
    textSize(40);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    text("Presiona el botón de play", width/2, height/2);
    pop();
  }
}

function infoText() {
  push();
  translate(0,130);
  noStroke();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(12);
  let len = song.currentTime();
  text("vol: " + sliderVol.value().toFixed(2).toString() ,width*.1,0);
  text("time: " + len.toFixed(2).toString() ,width/2.7,0);
  pop();
}

function ilustrar() {
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
  
  /////////////////// ESPECTRO DE FRECUENCIAS
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
  infoText();
}

function autoCorrelate(buffer) {
  let newBuffer = [];
  let nSamples = buffer.length;

  let autocorrelation = [];

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

function toggleSong() {
  userStartAudio();
  if(!song.isPlaying())  {
    song.play();
    isPlaying = true;
  } else {
    song.stop();
    isPlaying = false;
  }
}

function toggleInput() {
  if(audioInput)  {
    mic.start();
    fft.setInput(mic);
    audioInput = false;
    print('Mic Input');
    // audioIsPlaying = false;
  } else {
    mic.stop();
    fft.setInput(song);
    audioInput = true;
    print('Song Input');
  }
}

function onOff(){
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}

function alto(){
  song.stop();
  isPlaying = false;
}

function jumpSong() {
  let len = song.duration();
  let t = random(len);
  song.jump(t);
}
