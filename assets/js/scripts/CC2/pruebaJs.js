import "../globals";
import "p5/lib/addons/p5.sound";
import mySong from "../convoc/assets/nena.mp3";
const sketch = (p5) => {
  let isRunning = false;
  let vol;
  // let isLog = true;
  let actualFreq;
  // let osc1;
  let textColor;
  let ploter;
  let song;

  class PlotterWave {
    constructor() {
      // this.spectrum;
      console.log(this);
      this.bNormalize = true;
      this.centerClip = false;
      this.frecuencias = new window.p5.FFT();
      this.dibuja = this.dibuja.bind(this);
      this.autoCorrelate = this.autoCorrelate.bind(this);
      this.analiza = this.analiza.bind(this);
      this.spectrum = this.frecuencias.analyze.bind(this);
    }
    analiza = () => {
      let s = this.spectrum();
      console.log(s);
    };
    dibuja = () => {
      this.analiza();
      // Espectro de frecuencias
      // console.log(frec.analyze(1024));
      // for (let i = 0; i < this.spectrum.length; i++) {
      //   let c = p5.map(i, 0, this.spectrum.length, 0, 255);
      //   p5.fill(c, 255, 255); //remove stroke(255);
      //   // En caso de ser LOG
      //   if (this.isLog) {
      //     let a = p5.map(
      //       Math.log(i),
      //       0,
      //       Math.log(this.spectrum.length),
      //       0,
      //       p5.width
      //     );
      //     let b = p5.map(this.spectrum[i], 0, 255, 0, p5.height / 3);
      //     p5.rect(a, p5.height, p5.width / this.spectrum.length, -b);
      //     p5.fill(textColor);
      //     p5.text("LOG", (p5.width * 7) / 9, 50);
      //     // En caso de ser LIN
      //   } else {
      //     let a = p5.map(i, 0, this.spectrum.length, 0, p5.width);
      //     let b = p5.map(this.spectrum[i], 0, 255, 0, p5.height / 3);
      //     p5.rect(a, p5.height, p5.width / this.spectrum.length, -b);
      //     p5.fill(textColor);
      //     p5.text("LIN", (p5.width * 7) / 9, 50);
      //   }
      // }
      // //// Forma de onda en el tiempo
      // let waveform = this.frecuencias.waveform();
      // p5.noFill();
      // p5.beginShape();
      // p5.stroke(100, 255, 255);
      // for (let i = 0; i < waveform.length; i++) {
      //   let x = p5.map(i, 0, waveform.length, 0, p5.width);
      //   let y = p5.map(waveform[i], -1, 1, p5.height / 3, (p5.height * 2) / 3);
      //   p5.vertex(x, y);
      // }
      // p5.endShape();
      // let corrBuff = this.autoCorrelate(waveform);
      // p5.beginShape();
      // p5.stroke(180, 255, 255);
      // for (let i = 0; i < corrBuff.length; i++) {
      //   let w = p5.map(i, 0, corrBuff.length, 0, p5.width);
      //   let h = p5.map(
      //     corrBuff[i],
      //     -1,
      //     1,
      //     (p5.height * 4) / 9,
      //     (p5.height * 2) / 9
      //   );
      //   p5.curveVertex(w, h);
      // }
      // p5.endShape();
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
          if (p5.abs(newBuffer[index]) > biggestVal) {
            biggestVal = p5.abs(newBuffer[index]);
          }
        }
        for (let index = 0; index < nSamples; index++) {
          newBuffer[index] /= biggestVal;
        }
      }
      return newBuffer;
    };
  }

  p5.preload = () => {
    song = p5.loadSound(mySong);
  };

  p5.setup = () => {
    // osc1 = new p5.constructor.Oscillator();
    p5.createCanvas(600, 600).mousePressed(canvasPressed);
    p5.colorMode(p5.HSB);
    p5.textAlign(p5.CENTER);
    textColor = p5.color(80, 360, 30);
    textColor = p5.color(20, 300, 300);
    ploter = new PlotterWave();
  };

  p5.draw = () => {
    if (isRunning) {
      p5.background(0);
      textInfo(actualFreq, vol);
      ploter.dibuja();
    } else {
      p5.push();
      p5.background(0);
      p5.noStroke();
      p5.fill(textColor);
      p5.textSize(24);
      p5.text("Presiona el canvas", p5.width / 2, p5.height / 2);
      p5.pop();
    }
  };

  p5.mouseMoved = () => {
    actualFreq = logConvertion(p5.mouseX, 0, p5.width, 20, 20000);
    vol = p5.map(p5.mouseY, p5.height, 0, 0, 0.75);
    // osc1.freq(actualFreq);
    // osc1.amp(vol);
  };

  const logConvertion = (position, min, max, minLog, maxLog) => {
    var minp = min;
    var maxp = max;
    var minv = Math.log(minLog);
    var maxv = Math.log(maxLog);
    var scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * (position - minp));
  };

  /*p5.keyPressed = () => {
    switch (p5.key.toLowerCase()) {
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
        isLog = !isLog;
        break;
      default:
        console.log("Presiona otra tecla...");
    }
  };*/

  const canvasPressed = () => {
    if (!isRunning) song.play();
    else song.stop();
    isRunning = !isRunning;
  };

  const textInfo = () => {
    // Texto de informacion
    p5.push();
    p5.noStroke();
    p5.fill(textColor);
    p5.textSize(16);
    // p5.text("Osc: " + osc1.getType(), (p5.width * 1) / 9, 50);
    // p5.text(osc1.getFreq().toFixed(2).toString() + " hz", p5.width / 2, 50);
    p5.text((vol * 100).toFixed(2).toString() + " vol", (p5.width * 7) / 9, 50);
    p5.pop();
  };
};
export default sketch;
