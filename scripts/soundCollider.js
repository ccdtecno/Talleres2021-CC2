let cajas = [];
let numCajas = 10;
let bolitas = [];
let bol;
// let bolita;
let sliderVel;
// AUDIO
let voz, filtro, envolvente, monoSynth;
let anteriorX,anteriorY;

function setup() {
	let cnv = createCanvas(800,600);
    sliderVel = createSlider(0.1,30,1,0.1)
    cnv.parent('sketch');
    sliderVel.parent('sketch'); 
    cnv.mouseClicked(addColisionador);

    envolvente = new p5.Envelope(0.05,1,0.5,0.5,0.2,0);
    
    filtro = new p5.Filter();
    voz = new p5.SqrOsc();
    voz.disconnect();
    voz.connect(filtro);
    
	bolita = new Colisionador(0,0,20);

    for(i = 0; i < numCajas; i++){
        // Crea una cajita en una posicion random
		let c = new Cajita(random(width),random(height), random(30,100), random(30,100), i); 
        cajas.push(c);                       
	} 

	
    anteriorX = mouseX;

}

function draw(){
	background(0);
    push();
    noStroke();
    fill(255);
    text("Vel: " + str(sliderVel.value()),50,height-10);
    pop();

    if(anteriorX !=  mouseX) {
        filtro.freq(logConv(mouseX,0,width,20,20000));
        anteriorX = mouseX;
    } 

	for(i = 0; i < cajas.length; i++){
        cajas[i].setVelocidad(sliderVel.value());
        cajas[i].mostrar();
        cajas[i].revisaColision(bolita);

        if(bolitas.length != 0) {

            for(k = 0; k < bolitas.length; k++){
                cajas[i].revisaColision(bolitas[k]);
                // print(k);
            } 

        }        
	} 
    
    if(bolitas.length > 0) {
        for(i = 0; i < bolitas.length; i++){
            bolitas[i].mostrar();
        } 
    }
	bolita.mostrarActual(mouseX,mouseY); 
}

function addColisionador(){
    let b = new Colisionador(mouseX,mouseY,20)
    bolitas.push(b);
    print(bolitas);
}

function keyPressed() {
    let sw = key.toLowerCase();
    if(sw == 'g') {
        envolvente.triggerAttack(filtro);
    }
    if(sw == 'a') {
        voz.start();
    }
    if(sw == 's') {
        voz.stop();
    }
    
}

function keyReleased() {
    let sw = key.toLowerCase();
    if(sw == 'g') {
      envolvente.triggerRelease(filtro);
    }
  }

function logConv(posicion, min ,max, minLog, maxLog) {
    var minp = min;
    var maxp = max;
    var minv = Math.log(minLog);
    var maxv = Math.log(maxLog);
    var scale = (maxv-minv) / (maxp-minp);
  
    return Math.exp(minv + scale*(posicion-minp));
}

