var osc; 

function setup() {
  createCanvas(500, 500);
  
  //Creación de onda de sonido
  osc = new p5.Oscillator();
  //Definir tipo de onda
  osc.setType('sine');
  //sine, triangle, sawtooth or square.
  //Amplitud de onda
  osc.amp(0.5, 1);
  //Iniciar oscilador
  osc.start();
}

function draw() {
  //Mapeo de frecuencias con control del mouse en eje X
  var frec = map(mouseX,100,width,0,500);
  //Vincular mouse con frecuencia
  osc.freq(frec);
  console.log(frec);
  background(frec,0,0);

}

