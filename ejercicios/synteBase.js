let voz;
let sliderFrecuencia;
let fft;
let envolvente;
let filtro;
let angulo;
let aumentoAngulo;

function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch');
  // Objeto necesario para el analisis de la onda
  fft = new p5.FFT();
  // Objeto para controlar el oscilador
  voz = new p5.Oscillator();
  // Objeto para controlar la envolvente
  envolvente = new p5.Envelope(0.2,1,0.2,0.3,0.3,0);
  // Objeto para controlar el filtro
  filtro = new p5.Filter();
  
  // sliderFrecuencia = createSlider(0,1,0.05,0.0001);
  
  // Desconexion del oscilador con el nodo principal de audio
  voz.disconnect();
  // Conexion del oscilador con el nodo de la entrada del filtro
  voz.connect(filtro);
  
  // Angulo sirve para variar la senoidal que controla la velocidad de crecimiento del circulo central. Tambien ayuda a variar la resonancia del elemento
  angulo = 0;
  // aumentoAngulo controla la velocidad de variacion en la senoidal
  aumentoAngulo = 0.05;
  // Esta funcion imprime los comandos en consola
  instrucciones();
}

function draw() {
  // Jugando con la transparencia del canvas se pude lograr un efecto de 'estela' en la animación
  // El formato de color se escribe como
  // background(color R, color G, color B, transparecia) 
  // Por defecto todos los valores van de 0 a 255
  background(0,0,0,20);
  let corte = logConv(mouseX,0,width,20,20000);
  let sF = logConv(mouseY,0,height,20,20000);
  
  // let sF = logConv(sliderFrecuencia.value(),0,1,20,20000);
  
  voz.freq(sF);
  filtro.freq(corte);
  let r = 100 * sin(angulo);
  r = map(r, -100 , 100, 0.001, 10);
  filtro.res(r)
  let ancho = map(r,0.001,10, 50, 300);
  stroke(55, 20, 200);
  circle(width/2,height/2, ancho);
  
  angulo = angulo + aumentoAngulo;
  
  if(angulo > 2 * PI) {
    angulo = 0;
  }
  
  let onda = fft.waveform()
  beginShape();
  strokeWeight(1);
  stroke(255, 0, 0);
  noFill();
  for (var i = 0; i < onda.length; i++) {
    let amp = onda[i];
    let x = map(i, 0, onda.length, 0, width);
    let y = map(amp, -1, 1, -height / 2, height / 2);
    y = y + height / 2
    
    // circle(x,y,20);
    
    vertex(x, y);
    // point(x, y);
  }
  endShape();
}

function keyPressed() {
  if(key == 'a') {
    voz.start();
    // voz.amp();
    print('Osc start');
  }
  if(key == 's') {
    voz.stop();
    print('Osc stop');
  }
  
  if(key == 'g') {
    envolvente.triggerAttack(filtro);
  }
  
  if(key == '1'){
    voz.setType('sine');
  }
  if(key == '2'){
    voz.setType('triangle');
  }
  if(key == '3'){
    voz.setType('square');
  }
  if(key == '4'){
    voz.setType('sawtooth');
  }
  
}

function keyReleased() {
  if(key == 'g') {
    envolvente.triggerRelease(filtro);
  }
}

function logConv(posicion, min ,max, minLog, maxLog) {
    var minp = min;
    var maxp = max;
    var minv = Math.log(minLog);
    var maxv = Math.log(maxLog);
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(posicion-minp));
  }

function instrucciones() {
  print("Interactua con:");
  print("< a > Iniciar el oscilador");
  print("< s > Detener el oscilador");
  print("< g > Tocar");
  print(" //////// ondas ///////// ");
  print("< 1 > Senoidal");
  print("< 2 > Triangular");
  print("< 3 > Cuadrada");
  print("< 4 > Diente de sierra");
  print(" //////////////////////// ");
  print("MouseX: Corte del filtro");
  print("MouseY: Tono");
}
