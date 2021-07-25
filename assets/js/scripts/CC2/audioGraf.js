let isRunning = false;
let vol;
let actualFreq;
let osc1;
let textColor;
let ploter;
  
function setup() {
  createCanvas(600, 600).mousePressed(canvasPressed).mouseMoved(canvasMoved).parent("sketch-container");
  colorMode(HSB);
  textAlign(CENTER);
  textColor = color(80, 360, 30);
  textColor = color(20, 300, 300);  
  osc1 = new p5.Oscillator();
  ploter = new PlotterWave();
}

function draw() {
  if (isRunning) {
    background(0);
    ploter.dibuja();
    textInfo(vol);
  } else {
    push();
    background(0);
    noStroke();
    fill(255);
    textSize(24);
    text("Presiona el canvas", width / 2, height / 2);
    pop();
  }
}

function canvasMoved() {
  actualFreq = logConvertion(mouseX, 0, width, 20, 20000);
  vol = map(mouseY, height, 0, 0, 0.75);
  osc1.freq(actualFreq);
  osc1.amp(vol);
}

const logConvertion = (position, min, max, minLog, maxLog) => {
  var minp = min;
  var maxp = max;
  var minv = Math.log(minLog);
  var maxv = Math.log(maxLog);
  var scale = (maxv - minv) / (maxp - minp);
  return Math.exp(minv + scale * (position - minp));
}

function keyPressed() {
  switch (key.toLowerCase()) {
    case "1":
      osc1.setType("sine");
      break;
    case "2":
      osc1.setType("triangle");
      break;
    case "3":
      osc1.setType("square");
      break;
    case "4":
      osc1.setType("sawtooth");
      break;
    case "z":
      osc1.freq(297.775);
      break;
    case "x":
      osc1.freq(311.16);
      break;
    case "c":
      osc1.freq(324.53);
      break;
    case "v":
      osc1.freq(331.22);
      break;
    case "b":
      osc1.freq(344.62);
      break;
    case "n":
      osc1.freq(358);
      break;
    case "m":
      osc1.freq(371.35);
      break;
    case ",":
      osc1.freq(378.05);
      break;
    case "l":
      ploter.changeLog();
      break;
    default:
      console.log("Presiona otra tecla...");
  }
}

  function canvasPressed() {
    if (!isRunning) osc1.start();
    else osc1.stop();
    isRunning = !isRunning;
  };

  function textInfo(vol) {
    // Texto de informacion
    push();
    noStroke();
    fill(textColor);
    textSize(16);
    text("Osc: " + osc1.getType(), (width * 1) / 9, 50);
    text(osc1.getFreq().toFixed(2).toString() + " hz", width / 2, 50);
    text((vol * 100).toFixed(2).toString() + " vol", (width * 7) / 9, 50);
    pop();
  };

  class PlotterWave {
    constructor() {
      console.log(this);
      
      this.isLog = true;
      this.bNormalize = true;
      this.centerClip = false;
      this.frecuencias = new p5.FFT();
      this.dibuja = this.dibuja.bind(this);
      this.autoCorrelate = this.autoCorrelate.bind(this);
      this.spectrum = this.frecuencias.analyze.bind(this.frecuencias);
      this.wave = this.frecuencias.waveform.bind(this.frecuencias);
    }

    changeLog = () => {
      this.isLog = !this.isLog;
    }

    dibuja = () => {
      background(0);
      // Espectro de frecuencias
      let frecs = this.spectrum();
      for (let i = 0; i < frecs.length; i++) {
        let c = map(i, 0, frecs.length, 0, 255);
        fill(c, 255, 255); //remove stroke(255); xc  <Z
        // En caso de ser LOG
        if (this.isLog) {
          let a = map(
            Math.log(i),
            0,
            Math.log(frecs.length),
            0,
            width
          );
          let b = map(frecs[i], 0, 255, 0, height / 3);
          rect(a, height, width / frecs.length, -b);
          push();
          noStroke();
          fill(textColor);
          text("LOG", (width * 8.3) / 9, 50);
          pop();
          // En caso de ser LIN
        } else {
          let a = map(i, 0, frecs.length, 0, width);
          let b = map(frecs[i], 0, 255, 0, height / 3);
          rect(a, height, width / frecs.length, -b);
          push();
          noStroke();
          fill(textColor);
          text("LIN", (width * 8.3) / 9, 50);
          pop();
        }
      }
      // //// Forma de onda en el tiempo
      let waveform = this.wave();
      noFill();
      beginShape();
      stroke(100, 255, 255);
      for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, height / 3, (height * 2) / 3);
        vertex(x, y);
      }
      endShape();
      let corrBuff = this.autoCorrelate(waveform);
      beginShape();
      stroke(180, 255, 255);
      for (let i = 0; i < corrBuff.length; i++) {
        let w = map(i, 0, corrBuff.length, 0, width);
        let h = map(
          corrBuff[i],
          -1,
          1,
          (height * 4) / 9,
          (height * 2) / 9
        );
        curveVertex(w, h);
      }
      endShape();
    };

    autoCorrelate = (buffer) => {
      var newBuffer = [];
      var nSamples = buffer.length;
      // var autocorrelation = [];
      // center clip removes any samples under 0.1
      if (this.centerClip) {
        var cutoff = 0.1;
        for (var i = 0; i < buffer.length; i++) {
          var val = buffer[i];
          buffer[i] = Math.abs(val) > cutoff ? val : 0;
        }
      }
      for (let lag = 0; lag < nSamples; lag++) {
        let sum = 0;
        for (let index = 0; index < nSamples; index++) {
          let indexLagged = index + lag;
          if (indexLagged < nSamples) {
            let sound1 = buffer[index];
            let sound2 = buffer[indexLagged];
            let product = sound1 * sound2;
            sum += product;
          }
        }
        // average to a value between -1 and 1
        newBuffer[lag] = sum / nSamples;
      }
      if (this.bNormalize) {
        let biggestVal = 0;
        for (let index = 0; index < nSamples; index++) {
          if (abs(newBuffer[index]) > biggestVal) {
            biggestVal = abs(newBuffer[index]);
          }
        }
        for (let index = 0; index < nSamples; index++) {
          newBuffer[index] /= biggestVal;
        }
      }
      return newBuffer;
    };
  }