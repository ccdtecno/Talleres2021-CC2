class Colisionador {
	constructor(x,y,diametro) {
        this.dia = diametro;
	    this.x = x;
	    this.y = y;
		this.col = color(255,0,0);
        this.freq = this.logaritmicConv(this.x,0,width,20,20000)
    }

	mostrar () {
		noStroke();
		fill(this.col);
		ellipse(this.x,this.y,this.dia,this.dia);
	}

    mostrarActual (x,y) {
		this.x = x;
		this.y = y;
		noStroke();
		fill(this.col);
		ellipse(this.x,this.y,this.dia,this.dia);
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