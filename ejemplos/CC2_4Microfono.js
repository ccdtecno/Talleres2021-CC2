var osc; 
var mic;
var volhistory = [];



function setup() {
  createCanvas(500, 500);
  
  //Entrada de micrófono
  mic = new p5.AudioIn();
  mic.amp(1,0.9);
  mic.start();

}

function draw() {

  background(30, 219, 249);
  
  strokeWeight(random(1,4));
  noFill();
  //Contenemos los valores de entrada del micrófono para cambiar el diametro de la ellipse
  var vol = mic.getLevel();
  var diam = map(vol, 0, 0.9, 0, 2500);
  
   stroke(169, 51, 169 );

  for(var x = 0; x <= width; x += 50){
    for(var y = 0; y <= height; y += 50){
      fill(diam, 50, 100, 95);
      ellipse(x, y, diam, diam*2);
    }
  }
}

