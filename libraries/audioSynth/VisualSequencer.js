class VisualSequencer {
    constructor(posInit, size, horizontal,vertical) {
        this.pos = posInit;
        this.size = size;
        this.horizontal = horizontal;
        this.vertical = vertical;
        this.color = color(255);
        let sizeBox = createVector(size.x/horizontal *.2, size.y/vertical*.8);
        let sizeCollider = createVector(size.x/horizontal *.1, size.y/vertical*.1);
        this.cluster = new NoteCluster(4,this.pos,this.size,sizeBox);
        this.colliders = new clusterColliders(sizeCollider,'v2');
        // this.colliders[0] = new BolaCollider();
        // this.cluster = new NoteCluster(4,this.pos,sizeBox,60);
    }

    dibujarGrid() {
        push();
        noFill();
        strokeWeight(1);
        stroke(this.color);
        rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        let separacion = this.getHorizontalSeparation();
        for(let i = 0; i < this.horizontal; i ++) {
            rect(this.pos.x+(i*separacion),this.pos.y,this.size.x/this.horizontal,this.size.y);
        }
        separacion = this.getVerticalSeparation();
        for(let i = 0; i < this.vertical; i ++) {
            rect(this.pos.x,this.pos.y+(i*separacion),this.size.x,this.size.y/this.vertical);
        }
        pop();
    }

    dibujarColliders() {
        this.colliders.dibujar();
    }

    actualizarColliders() {
        if(this.colliders.length > 0){
            
        }
    }
    dibujarNotas() {
        this.cluster.dibujar();
    }

    actualizarNotas() {
        this.cluster.actualizar();
    }

    setColor(col) {
        this.color = col;
    }

    getHorizontalSeparation() {
        return this.size.x / this.horizontal;
    }

    getVerticalSeparation() {
        return this.size.y / this.vertical;
    }

    addCollider(x,y,w,t) {
        let c = new BolaCollider(x,y,w,t)
        this.colliders.add(c);
    }
}




class NoteCluster {
    constructor(number,posInit,size,sizeNote){
        this.notes = [];
        // let reposition = createVector(int(size/2),int(size/2));
        // this.posInit = p5.Vector.sub(posInit, size);
        this.posInit = posInit;
        this.pos = this.posInit.copy();
        this.size = size;
        this.noteSize = sizeNote;
        this.posFinal = p5.Vector.add(this.pos,this.size);
        this.vel = 0;
        
        let spaceY = this.size.y/number 
        for(let i = 0; i < number; i ++){
            let aumentoY = (i * spaceY) + (spaceY/2 - this.noteSize.y/2);
            let n = new NoteBox(this.pos.x-this.noteSize.x/2, this.pos.y+aumentoY, this.noteSize.x, this.noteSize.y, i);
            this.notes.push(n);
        }
        print("Creado el cluster de notas");
    }

    dibujar() {
        
        for(let i = 0; i < this.notes.length; i ++){
            // Dibuja las cajas
            this.notes[i].show();
            //Actualiza la posicion de las cajas
            // this.actualizar();
        }
    }

    actualizar() {
        for(let i = 0; i < this.notes.length; i ++){
            // Revisa colisiones de-las cajas con las bolitas
            // this.notes[i].collisionDetection(arrayObj);

            // Calcula la nueva posicion de las cajas
            let actualX = this.notes[i].getX() + this.vel;
            // Revisa los bordes
            let offsetX = this.noteSize.x/2;
            if(actualX > this.posFinal.x-offsetX)    
                actualX = this.posInit.x-offsetX;
            // Actualiza la posicion de las cajas
            this.notes[i].setX(actualX);            
        }
    }

    setVel(vel) {
        this.vel = vel;
    }

    // update() {

    // }

}

class NoteBox {
    constructor(x,y,w,h,id) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
	    this.color = color(random(0,150),random(80,200),random(80,220));
	    this.hit = false;
        this.isHitting = false;
        this.id = id || 0;
        this.note = int(random(40,88));
        this.velocidad = 1;
        this.especial = false;
        this.especialColor = color(120,50,150);
        print('Creada la nota: ', this.note);
    }


	show() {
		noStroke();
        if(this.especial) {
            fill(this.especialColor);
        } else {
            fill(this.color);
        }
		rect(this.x,this.y,this.w,this.h);
	}

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setColor(color) {
        this.color = color;
    }
    changeSpecial() {
        this.especial =! this.especial;
    }

}


class BolaCollider {
	constructor(x,y,diametro, type) {
        this.dia = diametro;
	    this.x = x;
	    this.y = y;
		this.color = color(255,0,0);
        this.type = type || 'v1'

        switch(this.type) {
            case 'v1':
                this.color = color(255,0,0);
                break;
            case 'v2':
                this.color = color(0,255,0);
                break;
            case 'h':
                this.color = color(255,255,0);
                break;
            case 'k':
                this.color = color(0,0,255);
                break;
        }
        
        
    }

	mostrar () {
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.dia,this.dia);
	}
    
    setColor(col){
        this.color = col;
    }

    collisionDetection (arregloObj) {
        // print(arregloObj.length);
        for(let i = 0; i < arregloObj.length; i++) {
            this.hit = collideRectCircle(arregloObj[i].x, arregloObj[i].y, arregloObj[i].w, arregloObj[i].h, this.x, this.y, this.dia); 
            if(this.hit){
                // if(this.isHitting == false) {
                    
                    arregloObj[i].changeSpecial();
                    // print(arregloObj[i].especial);
                    // this.isHitting = true;
                    // print(this.isHitting, i);
                // }
                
            } else {
                // this.isHitting = false;
                // print(this.isHitting,i);
                arregloObj[i].changeSpecial();
                // print(arregloObj[i].especial);
                // this.color = this.colorOriginal;
            }
        }		
	}


    logaritmicConv(posicion, min ,max, minLog, maxLog) {
        var minp = min;
        var maxp = max;
        var minv = Math.log(minLog);
        var maxv = Math.log(maxLog);
        var scale = (maxv-minv) / (maxp-minp);
      
        return Math.exp(minv + scale*(posicion-minp));
    }
    
}


class clusterColliders {
    constructor(type) {
        this.colliders = [ ];
        // this.colliderSize = size;
        this.type = type || 'v1';
    }

    dibujar() {
        for(let i = 0; i < this.colliders.length; i ++) {
            this.colliders[i].mostrar();
        }
    }

    actualizarColliders() {
        for(let i = 0; i < this.colliders.length; i ++) {
            this.colliders[i].collisionDetection(this.cluster.notes);
        }
    }

    add(c) {
        this.colliders.push(c);
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }
}
