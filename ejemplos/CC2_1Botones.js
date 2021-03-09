var song;
var button;
var jumButton;


var sliderRate;
var sliderPan;

function preload(){
  song = loadSound('songs/bicep.mp3');
  
}

function setup() {
  createCanvas(500, 400);
  
  sliderRate = createSlider(0,1.5,1,0.01);
//sliderPan = createSlider(-1,1,0,0.01);

  
//Declaración y configuración de botones
  button = createButton("play");
  button.mousePressed(togglePlaying);
  
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);
  
}



function draw() {
  background(random(0,100), 241, 223 );
  

//song.pan(sliderPan.value());
  song.rate(sliderRate.value());
}



//Construcción de la función togglePlaying
function togglePlaying(){
  
//Si la canción no se reproduce, al presionar el botón se reproducirá con un volumen
  if (!song.isPlaying()){
    song.play();
    song.setVolume(0.5);
//Sino, deten la canción
      } else {
        song.stop();
      }
}


//Construcción de la función jumpSong
function jumpSong(){
//Creamos una variable para la duración de la canción
   var len = song.duration();
//Y una para ubicar la posición del tiempo de reproducción, en este caso será aleatorio
   var t = random(len);
//La función jump requiere el parametro del tiempo para generar los saltos
   console.log(t);
   song.jump(t);
 }

