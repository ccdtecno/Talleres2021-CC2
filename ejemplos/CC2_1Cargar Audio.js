//variable para cargar archivo
var song;

// declaramos la variable song
function preload(){
  song = loadSound('songs/bicep.mp3');
  
}

function setup() {
//Creación de lienzo
  createCanvas(500, 400);

//song = loadSound('songs/xander.mp3', loaded);
  
//Iniciamos reproducción
  song.play();
  
//Volumen
  song.setVolume(0.9);
  
}


/*function loaded(){
   song.play();
 }*/


function draw() {
  background(0);
}

//Detener reproducción
function mousePressed(){
    song.stop();
}
