var song;
var button;
var fft;
var jumButton;



function preload(){
  song = loadSound('songs/bicep.mp3');
}

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  colorMode(HSB);

  button = createButton('toggle');
  button.mousePressed(toggleSong);
  
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);

  song.play();
  
//Agregamos el algoritmo de FFT
  fft = new p5.FFT(0.6,64);
}

function draw() {
  
  background(random(0,220), 100,0);
  noFill();
  translate(width/2, height/2);
  
  var spectrum = fft.analyze();
  
  beginShape();
  for(var i = 0; i < spectrum.length; i++){
    
    var angle = map(i,0,spectrum.length,0,360);
    
    var amp = spectrum[i];
    
    var r = map(amp,0,256,20,700);
    var x = r * cos(angle);
    var y = r * sin(angle);
    strokeWeight(random(0.1,3));
    stroke(200,i, 100);
    
    line(0,0,x,y);
    ellipse(x,y,r,r);
    
    }
  
  endShape();
}


function toggleSong(){
  if(song.isPlaying()){
    song.pause();
  } else {
    song.play();
  }
}

function jumpSong(){
   var len = song.duration();
   var t = random(len);
   song.jump(t);
 }