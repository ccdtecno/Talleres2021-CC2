var song;
var reverb;


function preload(){
  song = loadSound('songs/bicep.mp3');
  
}

function setup() {
  
  //Método aplicado para interacción al presionar el fondo
  var fondo = createCanvas(500, 400);
  fondo.mousePressed(playSong);

  //Función de reverb
  reverb = new p5.Reverb();
  
  //Escuchar sólo el reverb
  song.disconnect();
  
  //Conexión de la canción al efecto Reverb - Tiempo, Decay
  reverb.process(song, 3, 2);

  
}



function draw() {
  
  background(0,0,mouseX);
  
  //0 equivale a no reverb y 1 a todo el nivel del efecto
  var dryWet = constrain(map(mouseX,0,width,0,1), 0,1);
  reverb.drywet(dryWet);
  
  //Descripción del efecto y porcentaje de aplicación en la canción
  fill(255);
  textSize(20);
  text('Click para reproducir', 20, 30);
  text('seco/humedo: ' + round(dryWet * 100) + '%', 10, height - 30);
}

//Creación de función playSong
function playSong(){
  song.play();
}
