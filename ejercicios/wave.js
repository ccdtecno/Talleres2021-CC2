let sonido;
let transformada;
let botonPlay,botonStop,botonRandom;
let sliderVol;
let onda, amplitud, espectro;
let posInicialY;
let bandas

function preload() {
  sonido = loadSound('songs/synth.mp3');
  print('El sonido ha sido cargado');
}

function setup() {
  // Descomentar  esta linea para implementar en p5.WebEditor
  // createCanvas(400, 400);

  // Comentar estas lineas para implementar en p5.WebEditor
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch');

  //Creacion de elementos del DOM
  botonPlay = createButton('Play / Pause');
  botonPlay.mousePressed(toggle);
  botonStop = createButton('Stop');
  botonStop.mousePressed(alto);
  botonStop = createButton('Random');
  botonStop.mousePressed(aleatorio);
  sliderVol = createSlider(0,1,0.5,0.001)

  // Variables para la definicion del tipo de analisis FFT
  bandas = 1024;
  transformada = new p5.FFT(.8,bandas);
  amplitud = new p5.Amplitude();

  //Punto para la posicion inicial de la grafica de la onda
  posInicialY = height/2;
}

function draw() {
  background(82, 47, 105);
  sonido.amp(sliderVol.value());
  
  // Dibuja un cuadrado en el centro del canvas
  push();
  noStroke();
  fill(137, 43, 100);
  let diametro = map(amplitud.getLevel(),0,1,0,height*2);
  ellipse(width/2,0+diametro,diametro);
  pop();
  
  push();
  
  // Dibuja la forma de onda con una linea
  onda = transformada.waveform();
  stroke(183, 9, 76);
  noFill();
  beginShape();
  for(let i = 0; i < onda.length; i++) {
    let x = map(i,0,onda.length,0,width);
    let y = map(onda[i],-1,1,-height,height)
    y += posInicialY;
    curveVertex(x,y);
    // point(x,y)
  }
  endShape();
  pop();
  
  
  // Dibuja el espectro de frecuencias del sonido
  push()
  noStroke()
  fill(0, 145, 173);
  let w = width / 32;
  let h = height/2
  espectro = transformada.analyze() 
  for(let i = 0; i < espectro.length; i++) {
    let amp = espectro[i];
    let y = map(amp,0,255,0,-h) 
    rect(i*w,height,w-2,y)
    // point(x,y) 
  }
  pop();
}

// Funciones de los botones

function toggle() {
  if(sonido.isPlaying()) {
    sonido.pause();
    print('Pausa')
  } else {
    sonido.play();
    print('Play')
  }
}

function alto() {
  sonido.stop();
}

function aleatorio() {
  let duracion = sonido.duration();
  var t = random(duracion);
  sonido.jump(t);
  
  print(onda);
  
}