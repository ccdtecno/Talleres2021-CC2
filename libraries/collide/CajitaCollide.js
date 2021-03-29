class Cajita{
    constructor(x,y,w,h,id) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
	    this.color = color(random(0,150),random(80,200),random(80,220))
	    this.hit = false;
        this.id = id || 0;
        this.note = int(random(40,88));
        this.velocidad = 1;
        this.colorOriginal = this.color;
        // this.freq = 440;
    }
    
    revisarSuperposicion(objArray) {
        for(i=0;i<objArray.length;i++){
            //dont do the check if it is looking at itself
            if(this.id != i){ 
                 //colliding with anything?
                let colision = collideRectRect(this.x, this.y, this.w, this.h, objArray[i].x, objArray[i].y, objArray[i].w,  objArray[i].h);
                // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
                if(colision){ 
                    //try again:
                    this.x = random(width)
                    this.y = random(height)
                }
            }
        }
    }

	revisaColision (obj) {
        //collide the cir object into this rectangle object.
		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia); 
		if(this.hit){
            //set this rectangle to be black if it gets hit
			this.color = obj.col;
            this.freq = obj.freq;
            print(this.note);
            voz.freq(midiToFreq(this.note));  
            filtro.freq(obj.freq);
            envolvente.play(filtro);
        } else {
            this.color = this.colorOriginal;
        }
	}

	mostrar() {
		noStroke();
		fill(this.color);
        this.actualizar();
		rect(this.x,this.y,this.w,this.h);
	}

    actualizar() {
        //move to the right!
		this.x += this.velocidad; 
        //loop to the left!
		if(this.x > width){ 
			this.x = -this.w;
		}
    }

    setVelocidad(vel) {
        this.velocidad = vel;
    }
}
