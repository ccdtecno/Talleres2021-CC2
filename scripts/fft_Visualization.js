var button;
var jumButton;

var audioFile, fft;
var bNormalize = true;
var centerClip = false;

var audioIsPlaying = false;

function preload(){
  song = loadSound('../songs/bicep.mp3');
}


function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  colorMode(HSB);
  rectMode(CENTER); 
  button = createButton('Play / Stop');
  button.mousePressed(toggleSong);
  
  jumpButton = createButton("Random");
  jumpButton.mousePressed(jumpSong);

  song.play();
  
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
  
  background(191, 98, 15, 0.07);
  // array of values from -1 to 1
  var timeDomain = fft.waveform(1024, 'float32');
  var corrBuff = autoCorrelate(timeDomain);
  
  stroke(color_4);
  noFill();
  // fill(color_2);
  beginShape();
  for (var i = 0; i < corrBuff.length; i++) {
    var w = map(i, 0, corrBuff.length, 0, width);
    var h = map(corrBuff[i], -1, 1, 150, 0);
    curveVertex(w, h);
  }
  endShape();
  
  beginShape();
  for (var i = 0; i < corrBuff.length; i++) {
    var w = map(i, 0, corrBuff.length, width, 0);
    var h = map(corrBuff[i], -1, 1, 150, 0);
    curveVertex(w, h);
  }
  endShape();
  
  noFill();
  translate(width/2, height*3/4);
  
  var spectrum = fft.analyze();
  
  beginShape();
  
  for(var i = spectrum.length / 4; i < spectrum.length - 9; i++) { 
        
    var r = map(spectrum[i], 0, 255, 10, height/2);
    var angle = map(i, spectrum.length / 4, spectrum.length - 9, 150, 390);
    var x = r * cos(angle);
    var y = r * sin(angle);

    nZstroke = noise(nZstroke);
    
    strokeWeight(3 * nZstroke);
    stroke(color_1);
    fill(color_2);
    if(i >= spectrum.length/2 && i <= spectrum.length/2 + spectrum.length/16 + spectrum.length/32) {
      // noStroke();
      strokeWeight(2);
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
  ellipse(0,0,map(spectrum[1],0,255,10,100));
  endShape();
}


function toggleSong(){
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}

function jumpSong(){
   var len = song.duration();
   var t = random(len);
   song.jump(t);
 }



function autoCorrelate(buffer) {
  var newBuffer = [];
  var nSamples = buffer.length;

  var autocorrelation = [];

  // center clip removes any samples under 0.1
  if (centerClip) {
    var cutoff = 0.1;
    for (var i = 0; i < buffer.length; i++) {
      var val = buffer[i];
      buffer[i] = Math.abs(val) > cutoff ? val : 0;
    }
  }

  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      if (indexLagged < nSamples){
        var sound1 = buffer[index];
        var sound2 = buffer[indexLagged];
        var product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    newBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(newBuffer[index]) > biggestVal){
        biggestVal = abs(newBuffer[index]);
      }
    }
    for (var index = 0; index < nSamples; index++){
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
    audioFile.pause();
    mic.start();
    fft.setInput(mic);
    audioIsPlaying = false;
  } else {
    audioFile.play();
    mic.stop();
    fft.setInput(audioFile);
    audioIsPlaying = true;
  }
}