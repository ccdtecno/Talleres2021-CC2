let osc1, fft;
let sliderFreq;
let sliderVol;
let isLog;
let textColor;
var bNormalize = true;
var centerClip = false;

function setup()
{
  createCanvas(800, 600);
  fill(255);
  colorMode(HSB);
  sliderFreq = createSlider(0,800,0,0.01);
  sliderFreq.style('width: 794px');
  sliderFreq.position(0,0);

  sliderVol = createSlider(0,1,0,0.01);
  sliderVol.style('width: 392px');
  sliderVol.style('transform: rotate(270deg)');
  sliderVol.position(width-205,  height*3 /9 );
  
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  isLog = true;

  
  osc1.freq(sliderFreq.value())
  osc1.amp(sliderVol.value());
  osc1.start();
  
  fft = new p5.FFT();
  textColor = color(160,255,80);
}

function draw()
{
  background(0);
  
  // Sliders
  // print(sliderFreq.value());
  let freq = logslider(sliderFreq.value(), 0,800,20,20000);
  let vol = sliderVol.value();
  osc1.freq(freq);
  osc1.amp(vol);

  // Texto de informacion
  noStroke();
  fill(textColor);
  text('Oscilador: ' + osc1.getType(),width/5,50);
  text(freq + '  Hz',width*2/5, 50);
  text(vol + ' vol', width*3/5, 50);  
  
  // Espectro de frecuencias
  let spectrum = fft.analyze(1024);
  noStroke();
  for (let i = 0; i< spectrum.length; i++){
    let c = map(i,0, spectrum.length, 0,255)
    fill(c,255,255); //remove stroke(255);

    if(isLog) {
      let a = map(log(i), 0, log(spectrum.length), 0, width) 
      let b = map(spectrum[i], 0, 255, 0, height/3)
      rect(a, height, width / spectrum.length, -b)
      fill(textColor);
      text('LOG',width*3/4,50);

    } else {
      let a = map(i, 0, spectrum.length, 0, width);
      let b = map(spectrum[i], 0, 255, 0,height/3);
      rect(a, height, width / spectrum.length, -b )
      fill(textColor);
      text('LIN',width*3/4,50);
    } 
    
    
    
  }
  
  // Forma de onda en el tiempo
  let waveform = fft.waveform(1024, 'float32');
  noFill();
  beginShape();
  stroke(100,255,255);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, height/3, height*2/3);
    vertex(x,y);
  }
  endShape();


  let corrBuff = autoCorrelate(waveform);
  beginShape();
  stroke(180,255,255);
  for (let i = 0; i < corrBuff.length; i++) {
    let w = map(i, 0, corrBuff.length, 0, width);
    let h = map(corrBuff[i], -1, 1, height*4/9, height*2/9);
    curveVertex(w, h);
  }
  endShape();

  
}

function keyPressed() {
  if(key == '1')
    osc1.setType('sine');
  if(key == '2')
    osc1.setType('triangle');
  if(key == '3')
    osc1.setType('square');
  if(key == '4')
  osc1.setType('sawtooth');
  if(key == 'i') {
    osc1.start();
  }
  if(key == 'o') {
    osc1.stop();
  }
  if(key == 'l') {
    isLog =! isLog;
  }
  if(key == 'z') {
    sliderFreq.value(297.775);
  }
  if(key == 'x') {
    sliderFreq.value(311.16);
  }
  if(key == 'c') {
    sliderFreq.value(324.53);
  }
  if(key == 'v') {
    sliderFreq.value(331.22);
  }
  if(key == 'b') {
    sliderFreq.value(344.62);
  }
  if(key == 'n') {
    sliderFreq.value(358);
  }
  if(key == 'm') {
    sliderFreq.value(371.35);
  }
  if(key == ',') {
    sliderFreq.value(378.05);
  }
}

function logslider(position, min ,max, minLog, maxLog) {
  var minp = min;
  var maxp = max;
  var minv = Math.log(minLog);
  var maxv = Math.log(maxLog);
  var scale = (maxv-minv) / (maxp-minp);

  return Math.exp(minv + scale*(position-minp));
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

  