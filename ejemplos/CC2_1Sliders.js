var song;

//Variables para crear sliders
var sliderRate;
var sliderPan;

function preload(){
  song = loadSound('songs/bicep.mp3');
  
}

function setup() {
  createCanvas(500, 400);
  
  //Configuración de valores de sliders
  sliderRate = createSlider(0,1.5,1,0.01);
//sliderPan = createSlider(-1,1,0,0.01);

  

  song.play();
  
  song.setVolume(0.5);
  
}


function draw() {
  background(random(100,200),50,255);
  
//Dibujo de sliders
//song.pan(sliderPan.value());
  song.rate(sliderRate.value());
}


