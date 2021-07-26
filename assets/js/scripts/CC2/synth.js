let isPlaying = false;
let isLog = true;
let bNormalize = true;
let centerClip = false;
let osc1, osc2, lpf, hpf, rev, env, fft, del;
let noteOsc1, volOsc1;
let noteOsc2, volOsc2;
let lowFreq, resLowFreq, highFreq
let drywetReverb, drywetDelay;
let correlationColor, waveColor, freqColor, textColor, backColor;
let attack,decay,sustain,release;

function setup() {
  createCanvas(400, 300).parent("sketch-container").mousePressed(canvasPressed);
  osc1 = new p5.Oscillator("sawtooth", 220);
  osc2 = new p5.Oscillator("square",440);
  lpf = new p5.Filter();
  hpf = new p5.Filter("highpass")
  env = new p5.Envelope(0,1,0.5,0.2,0.1,0);
  del = new p5.Delay();
  rev = new p5.Reverb();
  fft = new p5.FFT();

  noteOsc1 = createSlider(1,127,40,1).parent("sketch-info").mousePressed(actualizaOsc);
  volOsc1 = createSlider(0,1,0.1,0.001).parent("sketch-info").mousePressed(actualizaOsc);
  noteOsc2 = createSlider(-24,24,0,1).parent("sketch-info").mousePressed(actualizaOsc);
  volOsc2 = createSlider(0,1,0,0.001).parent("sketch-info").mousePressed(actualizaOsc);
  highFreq = createSlider(1,127,1,1).parent("sketch-info-2").mousePressed(actualizaOsc);
  lowFreq = createSlider(10,136,136,1).parent("sketch-info-2").mousePressed(actualizaOsc);
  resLowFreq = createSlider(0.001,50,0,0.01).parent("sketch-info-2").mousePressed(actualizaOsc);
  
  drywetReverb = createSlider(0,1,0,0.01).parent("sketch-info-3").mousePressed(actualizaOsc);
  drywetDelay = createSlider(0,1,0,0.01).parent("sketch-info-3").mousePressed(actualizaOsc);

  attack = createSlider(0.01,3,0.01,0.01).parent("sketch-info-4").mousePressed(actualizaADSR);
  decay = createSlider(0.01,3,1,0.01).parent("sketch-info-4").mousePressed(actualizaADSR);
  sustain = createSlider(0,1,0.1,0.01).parent("sketch-info-4").mousePressed(actualizaADSR);
  release = createSlider(0.01,2,0.01,0.01).parent("sketch-info-4").mousePressed(actualizaADSR);

  osc1.disconnect();
  osc2.disconnect();
  hpf.disconnect();
  // lpf.disconnect();
  osc1.connect(hpf);
  osc2.connect(hpf);
  hpf.connect(lpf);
  rev.process(lpf,3,2);
  del.process(lpf,.5,0.75,5000);
  env.setInput(lpf);

  correlationColor = color(191, 90, 54);
  textColor = color(217, 184, 143);
  waveColor = color(242, 124, 56);
  freqColor = color(217, 159, 89);
  backColor = color(1,16,41);
  backColor2 = color(65,58,60);
  // background(backColor);
  
  // setGradient(0, 0, width/2, height/2, color(0), color(255), "X_AXIS");
}


function draw() {
  // background(backColor);
  // setGradient(0, 0, width, height, color(0), color(255), "Y_AXIS");
  setGradient(0, 0, width, height, backColor, correlationColor, "Y_AXIS_INVERSE");
  // setGradient(0, 0, width, height, color(0), color(255), "X_AXIS");
  // setGradient(0, 0, width, height, color(0), color(255), "X_AXIS_INVERSE");
  if(isPlaying) {
    // actualizaOsc();
    ploter();
    textPlay();
  } else {
    textStop();
  }
}

function actualizaOsc() {
  osc1.freq(midiToFreq(noteOsc1.value()));
  osc1.amp(volOsc1.value());
  osc2.freq(midiToFreq(noteOsc1.value() + noteOsc2.value()));
  osc2.amp(volOsc2.value());
  lpf.freq(midiToFreq(lowFreq.value()));
  lpf.res(resLowFreq.value());
  hpf.freq(midiToFreq(highFreq.value()));
  rev.drywet(drywetReverb.value());
  del.drywet(drywetDelay.value());
}

function actualizaADSR() {
  env.setADSR(attack.value(), decay.value(), sustain.value(), release.value());
}

function keyPressed() {
  let k = key.toLowerCase();
  switch(k) {
    case "l":
      isLog = !isLog;
      break;
    case "z":
      osc1.freq(midiToFreq(noteOsc1.value()));
      osc2.freq(midiToFreq(noteOsc1.value() + noteOsc2.value()));
      env.play();
      break;
    case "s":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 1));
      osc2.freq(midiToFreq(noteOsc1.value() + 1 + noteOsc2.value()));
      env.play();
      break;
    case "x":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 2));
      osc2.freq(midiToFreq(noteOsc1.value() + 2 + noteOsc2.value()));
      env.play();
      break;
    case "d":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 3));
      osc2.freq(midiToFreq(noteOsc1.value() + 3 + noteOsc2.value()));
      env.play();
      break;
    case "c":
      osc1.freq(midiToFreq(noteOsc1.value() + 4));
      osc2.freq(midiToFreq(noteOsc1.value() + 4 + noteOsc2.value()));
      env.play();
      break;
    case "v":
      osc1.freq(midiToFreq(noteOsc1.value() + 5));
      osc2.freq(midiToFreq(noteOsc1.value() + 5 + noteOsc2.value()));
      env.play();
      break;
    case "g":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 6));
      osc2.freq(midiToFreq(noteOsc1.value() + 6 + noteOsc2.value()));
      env.play();
      break;
    case "b":
      osc1.freq(midiToFreq(noteOsc1.value() + 7));
      osc2.freq(midiToFreq(noteOsc1.value() + 7 + noteOsc2.value()));
      env.play();
      break;
    case "h":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 8));
      osc2.freq(midiToFreq(noteOsc1.value() + 8 + noteOsc2.value()));
      env.play();
      break;
    case "n":
      osc1.freq(midiToFreq(noteOsc1.value() + 9));
      osc2.freq(midiToFreq(noteOsc1.value() + 9 + noteOsc2.value()));
      env.play();
      break;
    case "j":
      console.log();
      osc1.freq(midiToFreq(noteOsc1.value() + 10));
      osc2.freq(midiToFreq(noteOsc1.value() + 10 + noteOsc2.value()));
      env.play();
      break;
    case "m":
      osc1.freq(midiToFreq(noteOsc1.value() + 11));
      osc2.freq(midiToFreq(noteOsc1.value() + 11 + noteOsc2.value()));
      env.play();
      break;
    case ",":
      osc1.freq(midiToFreq(noteOsc1.value() + 12));
      osc2.freq(midiToFreq(noteOsc1.value() + 12 + noteOsc2.value()));
      env.play();
      break;
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
    case "5":
      osc2.setType("sine");
      break;
    case "6":
      osc2.setType("triangle");
      break;
    case "7":
      osc2.setType("square");
      break;
    case "8":
      osc2.setType("sawtooth");
      break;
    default:
      console.log("Presiona otra tecla...");
      break;
  }

}
function canvasPressed() {
  isPlaying = !isPlaying;
  console.log(isPlaying);
  if(!isPlaying) {
    osc1.stop();
    osc2.stop();
  } else {
    osc1.start(); 
    osc2.start();
  }
}
function ploter() {
  waveForm();
  peakForm();
}
function peakForm() {
  let frecs = fft.analyze();
      for (let i = 0; i < frecs.length; i++) {
        let c = map(i, 0, frecs.length, 0, 255);
        freqColor.setRed(c);
        fill(freqColor); //remove stroke(255); xc  <Z
        // En caso de ser LOG
        if (isLog) {
          let a = map(Math.log(i), 0, Math.log(frecs.length), 0, width);
          let b = map(frecs[i], 0, 255, 0, height / 3);
          rect(a, height, width / frecs.length, -b);
          // En caso de ser LIN
        } else {
          let a = map(i, 0, frecs.length, 0, width);
          let b = map(frecs[i], 0, 255, 0, height / 3);
          rect(a, height, width / frecs.length, -b);
        }
      }
}
function waveForm() {
  let waveform = fft.waveform();
  noFill();
  beginShape();
  strokeWeight(2);
  stroke(waveColor);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, (height * 2) / 3);
    vertex(x, y);
  }
  endShape();

  // let corrBuff = autoCorrelate(waveform);
  // beginShape();
  // noFill();
  // strokeWeight(2);
  // stroke(correlationColor);
  // for (let i = 0; i < corrBuff.length; i++) {
  //   let w = map(i, 0, corrBuff.length, 0, width);
  //   let h = map(corrBuff[i], 1, -1, 0, (height * 1) / 4);
  //   curveVertex(w, h);
  // }
  // endShape();
}
function textPlay() {
  push();
  noStroke();
  fill(textColor);
  textSize(12);
  textAlign(CENTER);
  let vol = volOsc1.value(); 
  let nota = noteOsc1.value();
  let vol2 = volOsc2.value(); 
  let semitone =  noteOsc1.value() + noteOsc2.value();
  let f1 = midiToFreq(highFreq.value()).toFixed(2); 
  let f2 = midiToFreq(lowFreq.value()).toFixed(2);
  let r2 = resLowFreq.value().toFixed(2);
  let a = attack.value().toFixed(2); 
  let d = decay.value().toFixed(2);
  let s = sustain.value().toFixed(2);
  let r = release.value().toFixed(2);
  let rev = drywetReverb.value();
  let dela = drywetDelay.value();

  text("Type 1: " + osc1.getType(),width/5, 60);
  text("Volumen: " + vol,width/5, 100);
  text("Nota: " + nota,width/5, 80);

  text("Type 2: " + osc2.getType(),width*3/5, 60);
  text("Vol2: " + vol2,width*3/5, 100);
  text("Nota: " + semitone,width*3/5, 80);

  text("High: " + f1,width/5, 140);
  text("Low: "+ f2,width/5, 160);
  text("Res: " + r2,width/5, 180);
  
  text("Reverb: " + rev,width*1/5, 220);
  text("Delay: " + dela,width*3/5, 220);
  text("A: " + a,width*1/5, 260);
  text("D: " + d,width*2/5, 260);
  text("S: " + s,width*3/5, 260);
  text("R: " + r,width*4/5, 260);
  if(isLog) text("LOG", (width * 3) / 5, 140);
  else text("LIN", (width * 3) / 5, 140);
  pop();
}
function textStop() {
  push();
  noStroke();
  fill(textColor);
  textSize(24);
  textAlign(CENTER);
  text("Presiona el canvas",width/2,height/2);
  pop();
}
function autoCorrelate(buffer) {
  var newBuffer = [];
  var nSamples = buffer.length;
  // center clip removes any samples under 0.1
  if (centerClip) {
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
  if (bNormalize) {
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
}
function setGradient(x, y, w, h, c1, c2, axis) {
  push();
  noFill();
  switch(axis) {
    case "Y_AXIS":
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
      break;
    case "Y_AXIS_INVERSE":
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c2, c1, inter);
        stroke(c);
        line(x, i, x + w , i);
      }
      break;
    case "X_AXIS":
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
      break;
    case "X_AXIS_INVERSE":
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c2, c1, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
      break;
    default:
      console.log("Caso no valido");
      break;
  }
  pop();

}
