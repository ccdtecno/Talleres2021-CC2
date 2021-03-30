var bgColor;
var branchColor;
let audioIn, amplitude;

// variables para dibujar el tronco
let tronco, angulo, factor;
// limite inferior de dibujo
let limite = 2;
let a = 0;

let bandera = false;

function setup() { 
  let cnv = createCanvas(800, 600);
  cnv.parent('sketch');
  angleMode(DEGREES);
  
  bgColor= color(40,180,230);
  branchColor = color(0);
  angulo = 30;
  tronco = 180;
  factor = 0.72;
  audioIn = new p5.AudioIn();
//   (audioIn.getSources(gotSources));
  audioIn.start();
  amplitude = new p5.Amplitude();
  
  
  WebMidi.enable(function (err) { 
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
  for(i = 0; i< WebMidi.outputs.length; i++) {
    console.log(i + ": " + WebMidi.outputs[i].name); 	
  }  
    
  inputSoftware = WebMidi.inputs[0];
     
  inputSoftware.addListener('noteon', "all", function (e) {
    // print(e.note);
    bandera = true;
    limite = 5;
    angulo = random(50,135);
    texto(a);  
    
    
    if((e.note.name + e.note.octave)=="E1"){
 	  var randomR = random(110,255);
  	  var randomG = random(70,100);
  	  var randomB = random(10,60);
      var randomT = random(15,30);
  	  bgColor = color(randomR,randomG,randomB,randomT);    
    }

    if(e.note.name + e.note.octave=="E4"){
        tronco = random(150,250);
    }
    
    //Numero MIDI: 65 nota F4
    if(e.note.number==65){
      factor =  random(0.45,0.65);
    }
    //Numero MIDI: 60 nota C4
    if(e.note.number==60){
      brachColor = color(int(random(100)), int(random(50)), int(random(50)));
    }
  } );
  
  inputSoftware.addListener('noteoff', "all", function (e) {
    //Show what we are receiving
  	// console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

    if(e.note.number==64){
      // console.log("Detected MIDI note number 64 turned OFF");    
      }
    });
  });
  background(bgColor);
  arboles();
} 

function draw() { 
  if(bandera) {
      pintar();
  }
}

function pintar() {
    background(bgColor);
  
    a = audioIn.getLevel();
    
    noFill();
    stroke(map(a,0,1,255,150),150,50);
    ellipse(width/2,height/2,a*10000);
    arboles();
    
}

function rama(longitud, trazo) {
  stroke(branchColor);
  strokeWeight(trazo);
  line(0,0,0, -longitud);
  translate(0, -longitud);
  let f = random(0.4,0.65);
  if (longitud > limite) {
    push();
    stroke(branchColor);
    strokeWeight(1);
    rotate(angulo);  
    rama(longitud * factor, trazo * f);
    pop();
    
    push();
    
    stroke(branchColor);
    strokeWeight(1)
    rotate(-angulo);  
    rama(longitud * factor, trazo * f);
    pop();
    
  }
  
}

function arboles() {
    push();
    // Inicio de dibujo en la parte inferior del canvas
    translate(width/2, height)
    // dibuja las ramas de manera recursiva
    rama(tronco, 50);
    pop();
  
    push();
    translate(width/4,height)
    // dibuja las ramas de manera recursiva
    rama(tronco/1.5, 20);
    pop();
  
    push();
    translate(width*3/4,height)
    // dibuja las ramas de manera recursiva
    rama(tronco/1.5, 20);
    pop();
}

function texto(a) {
  let t = map(a,0,1,24,48);
  push();
  noStroke();
  fill(255);
  textSize(24);
  text("¡¡Ayuda!!",width/2-50,40);
  textSize(t*2);
  text("¡ El bosque se quema !",width/2-t*10,100);
  pop();
  
}

function gotSources(deviceList) {
  if (deviceList.length > 0) {
    //set the source to the first item in the deviceList array
    audioIn.setSource(2);
    // let currentSource = deviceList[audioIn.currentSource];
    // print(deviceList)
    // print(currentSource);
    // text('set source to: ' + currentSource.deviceId, 5, 20, width);
  }
}
