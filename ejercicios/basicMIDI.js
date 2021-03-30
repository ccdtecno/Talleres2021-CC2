var bgColor;
var squareColor;

// variables para dibujar el tronco
let tronco, angulo, factor;

// limite inferior de dibujo
let limite = 2;


function setup() { 
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch');
  angleMode(DEGREES);
  
  bgColor= color(220,220,200);
  squareColor = color(100,100,100);
  angulo = 30;
  tronco = 100;
  factor = 0.3
  WebMidi.enable(function (err) { //check if WebMidi.js is enabled

  if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }

  console.log("---");
  console.log("Inputs Ports: ");
  for(i = 0; i< WebMidi.inputs.length; i++){
     console.log(i + ": " + WebMidi.inputs[i].name);
  }
  
  console.log("---");
  console.log("Output Ports: ");
  for(i = 0; i< WebMidi.outputs.length; i++){
  		console.log(i + ": " + WebMidi.outputs[i].name);
    	
    }  
    
  //Escoger un puerto de entrada
  inputSoftware = WebMidi.inputs[0];
      
  //listen to all incoming "note on" input events
  inputSoftware.addListener('noteon', "all", function (e) {

	  	//change the background color variable
 		var randomR = random(100,255);
  	 	var randomG = random(100,255);
  		var randomB = random(100,255);
  		bgColor = color(randomR,randomB,randomG);
        
    
    	if(e.note.name=="D"){
       	// console.log("A D note has been received, any octave");
        squareColor = color(int(random(100)), int(random(100)), int(random(100)));
          
        angulo = random(10,120);
        tronco = random(100,150);
        factor =  random(0.3,0.65);
      }
    	if((e.note.name + e.note.octave)=="C4"){
          // console.log("A C4 note has been received, specifically");
        
      }
    	//Or use the MIDI note number instead
    	if(e.note.number==64){
        // console.log("Detected MIDI note number 64 turned ON");
        
      }
  	}
  );
    

    inputSoftware.addListener('noteoff', "all",
  	function (e) {
 		 	//Show what we are receiving
  		// console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

    	if(e.note.number==64){
        // console.log("Detected MIDI note number 64 turned OFF");
        
      }
  	}
  );
	});
	
	
} 

function draw() { 
  background(bgColor);
  
  // Inicio de dibujo en la parte inferior del canvas
  translate(width/2,height)
  push();
  noStroke();
  fill(0);
  text("a: "+ str(int(angulo)),-width/2.3,-10);
  text("f: "+ str((factor)),-95,-10);
  text("t: "+ str(int(tronco)),50,-10);
  pop();
  // dibuja las ramas de manera recursiva
  rama(tronco);
  
}


function rama(longitud) {
  stroke(squareColor);
  strokeWeight(2);
  line(0,0,0, -longitud);
  translate(0, -longitud);
  
  if (longitud > limite) {
    push();
    stroke(squareColor);
    rotate(angulo);  
    rama(longitud * factor);
    pop();
    
    push();
    stroke(squareColor);
    rotate(-angulo);  
    rama(longitud * factor);
    pop();
    
  }
  
}