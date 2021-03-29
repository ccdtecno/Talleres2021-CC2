let numX = 8;
let numY = 4;
let posInicial, size;
let synth; 
let sliderVel;

let hat,kick;

function preload() {
    kick = loadSound('../songs/kick.wav');
    hat = loadSound('../songs/hh.wav');
}
function setup() {
    getAudioContext().suspend();
    let cnv = createCanvas(800,600);
    cnv.parent('sketch');

    sliderVel = createSlider(1, 20, 5, 1);
    sliderVel.parent('sketch');

    posInicial = createVector(50, 50);
    size = createVector(700, 500);

    plot = new VisualSequencer(posInicial,size,numX,numY);
    synth = new VoiceSynth();

    
}

function draw() {
    background(0);  

    push();
    noStroke();
    fill(255);
    text("Vel: " + str(sliderVel.value()),50,height-10);
    pop();

    // let dryWet = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  // 1 = all reverb, 0 = no reverb
    plot.cluster.setVel(sliderVel.value());
    plot.dibujarGrid();
    plot.dibujarNotas();
    plot.actualizarNotas();
    plot.dibujarColliders();
    plot.actualizarColliders();
}

function mouseClicked() {
    plot.addCollider(mouseX,mouseY,20, 'v2');
}
function mousePressed(){
    synth.voice1Play();
}


function keyPressed() {
    if(key == 'a') {
        userStartAudio();
        // synth.voice1Play();
    }

    if(key == 's') {
        synth.voice1Stop();
        
    }

    if(key == 't') {
        // userStartAudio();
        synth.voice1Play();
    }

    if(key == 'y') {
        // userStartAudio();
        synth.voice2Play();
    }

    if(key == 'u') {
        kick.play();
    }

    if(key == 'i') {
        hat.play();
    }
}
