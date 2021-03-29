let cajas = [];
let numCajas = 25;
let bolita;

let voz, filtro, envolvente;

function setup() {
	let cnv = createCanvas(800,600);
    sliderVel = createSlider(0.1,30,1,0.1)
    cnv.parent('sketch');
    sliderVel.parent('sketch');
    // Creacion de mi objeto para el sonido
    voz = new p5.SqrOsc();
    // Objeto para controlar la envolvente
    envolvente = new p5.Envelope(0.05,1,0.5,0.3,0.5,0);
    // Objeto para controlar el filtro
    filtro = new p5.Filter();
  
    voz.disconnect();
    voz.connect(filtro);
    
	for(i = 0; i < numCajas; i++){
        // Crea una cajita en una posicion random
		let c = new Cajita(random(width),random(height), random(30,100), random(10,50)); 
		// Añade la caja al arreglo de cajas
        cajas.push(c); 
	}
    // crea un objeto Colisionador
	bolita = new Colisionador(20);
}

function draw(){
	background(0);
    filtro.freq(logConv(mouseX,0,width,20,20000,));

	for(i = 0; i < cajas.length; i++){
        cajas[i].setVelocidad(sliderVel.value()); 
        cajas[i].mostrar();
        //collide against the circle object
		cajas[i].revisaColision(bolita, voz); 
       
        // cajas[i].suenaColision(voz); 
        
	} 

    //pass the x,y pos in to the circle.
	bolita.mostrar(mouseX,mouseY); 

}

function keyPressed() {
    if(key.toLowerCase() == 'g') {
        envolvente.triggerAttack(filtro);
        // print('Press')
    }
    if(key.toLowerCase() == 'a') {
        voz.start();
    }
    if(key.toLowerCase() == 's') {
        voz.stop();
    }
    
}

function keyReleased() {
    if(key.toLowerCase() == 'g') {
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




class Cajita{
    constructor(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
	    this.color = color(random(0,100),random(255),random(255))
	    this.hit = false;
        // this.note = int(map(y,0,height,40,64));
        this.note = int(random(40,64));
        this.velocidad = 1;
    }

	revisaColision (obj) {
        //collide the cir object into this rectangle object.
		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); 
		if(this.hit){
            //set this rectangle to be black if it gets hit
			this.color = color(random(255),random(255),random(255));
            print(this.note);
            // osc.start();
            voz.freq(midiToFreq(this.note));  
            envolvente.play(filtro);
            // envolvente.triggerAttack(filtro);
		// } else {
            // envolvente.triggerRelease(filtro);
        }
	}

	mostrar() {
		noStroke();
		fill(this.color);
        //move to the right!
		this.x += this.velocidad; 
        //loop to the left!
		if(this.x > width){ 
			this.x = -this.w;
		}
		rect(this.x,this.y,this.w,this.h);
	}

    setVelocidad(vel) {
        this.velocidad = vel;
    }
}

class Colisionador {
	constructor(diametro) {
        this.dia = diametro;
	    this.color = color(255,0,0)
	    this.x;
	    this.y;
    }

	mostrar (x,y) {
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

}