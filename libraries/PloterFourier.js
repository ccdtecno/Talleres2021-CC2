class PloterFourier {
    constructor(centroPolarPlot, initTimePlot, amplitude, armonicos) {
        this.tiempo = 0;
        this.timeStep = 0.02;
        // this.velTime = -0.05;
        this.amp = amplitude;
        // this.piFactor = (3 / (1 * PI));
        // this.radio = this.amp + this.piFactor;
        this.radio = this.amp;
        this.resolucion = armonicos;

        this.arrayWaveTime = [];
        this.arrayEspyro = [];

        this.centroPolar = centroPolarPlot;
        this.puntoExterior;
        this.initPlotTime = initTimePlot;

        this.sizeTiempoPlot = 500;
        this.sizePolarPlot = 1000;
        this.factor = 0;
        this.funcActual = 1;
    }

    actualizar() {
        // background(0);   
        this.dibujaAxis();
        this.puntoExterior = this.centroPolar.copy();
        let amplitud = this.amp;
        for(let i = 0; i < this.resolucion; i ++) {
            this.centroActual = this.puntoExterior.copy();
            let n;
            
            switch(this.funcActual) {
                case 1:
                    // TRIANGULAR
                    n = i * 2 + 1; // numeros impares   
                    this.radio = this.amp * (6.5 / (n*n*PI*PI) * pow((-1),((n-1)/2)));
                    this.puntoExterior.x += (this.radio * cos(n * this.tiempo));
                    this.puntoExterior.y += (this.radio * sin(n * this.tiempo));
                    break;
                    
                case 2:
                    //SQUARE;
                    n = i * 2 + 1; // numeros impares   
                    this.radio = this.amp * (2.5 / (n * PI));
                    this.puntoExterior.x += (this.radio * cos(n * this.tiempo));
                    this.puntoExterior.y += (this.radio * sin(n * this.tiempo));
                    break;
                case 3:
                    // SAWTOOTH
                    n = i + 1;
                    this.radio = 2.5 * this.amp * ((1 / 2) - (1 /PI)) * (1/n);
                    // Calcula el punto exterior;
                    this.puntoExterior.x += (this.radio * cos(n * this.tiempo));
                    this.puntoExterior.y += (this.radio * sin(n * this.tiempo));
                    break;
                case 4:
                        // SINE
                        this.radio =  this.amp;
                        // Calcula el punto exterior;
                        this.puntoExterior.x += (this.radio * cos(this.tiempo));
                        this.puntoExterior.y += (this.radio * sin(this.tiempo));
                        break;
                case 5:
                        // SINE
                        n = i + 1; 
                        this.radio =  amplitud;
                        // if(i === 0)
                        
                        // else 
                        //     this.radio =  
                        // this.amp *= (this.factor / n); 
                        // print(this.radio);
                        
                        // Calcula el punto exterior;
                        this.puntoExterior.x += (this.radio * cos(this.tiempo*n));
                        this.puntoExterior.y += (this.radio * sin(this.tiempo*n));
                        amplitud *= this.factor;
                        break;
                        
            }
            this.dibujaPolarStructure();
        }
        this.guardaPolar();
        this.guardaTiempo();
        this.dibujaBridgeStroke();
        this.dibujaTimeShape();
        this.dibujaPolarShape();
        // print('');
        // Actualiza el tiempo en el canvas
        // tiempo += velTime;
        this.tiempo += this.timeStep;

    }

    guardaTiempo() {
        // Guarda el valor de 'y' del punto exterior
        // del circulo mas pequeño a traves  del tiempo
        this.arrayWaveTime.unshift(this.puntoExterior.y-this.centroPolar.y);
        // Limita el numero de valores del  de tiempo
        if(this.arrayWaveTime.length > this.sizeTiempoPlot) {
            this.arrayWaveTime.pop();
        }
    }

    guardaPolar() {
        // Guarda la posicion en 'y' del Punto Exterior
        // del circulo mas pequeño del arreglo
        this.arrayEspyro.unshift(this.puntoExterior.x, this.puntoExterior.y);
        // Limita el numero de muestras en el arreglo
        // de la grafica polar
        if(this.arrayEspyro.length > this.sizePolarPlot) {
            this.arrayEspyro.pop();
        }
    }

    dibujaAxis() {
        push();
        stroke(255,100);
        strokeWeight(1);
        // Dibuja los ejes en el plano del tiempo
        line(this.initPlotTime.x - 50, this.initPlotTime.y, this.initPlotTime.x + 450, this.initPlotTime.y);
        line(this.initPlotTime.x, this.initPlotTime.y - this.amp * 2, this.initPlotTime.x, this.initPlotTime.y + this.amp * 2);
        // Dibuja los ejes del plano polar
        line(this.centroPolar.x - (2 * this.amp), this.centroPolar.y,this.centroPolar.x + (2 * this.amp), this.centroPolar.y)
        line(this.centroPolar.x, this.centroPolar.y - (2 * this.amp), this.centroPolar.x, this.centroPolar.y + (2 * this.amp));
        pop();
    }


    dibujaPolarStructure() {
        // Dibuja estructura del espirografo
        push();
        // Dibuja circulo
        strokeWeight(1);
        stroke(255,100);
        noFill();
        ellipse(this.centroActual.x, this.centroActual.y, this.radio * 2);
        // Dibuja el radio
        line(this.centroActual.x, this.centroActual.y,this.puntoExterior.x,this.puntoExterior.y);
        // Dibuja los puntos del centro y del exterior
        strokeWeight(3);
        point(this.centroActual.x, this.centroActual.y);
        point(this.puntoExterior.x,this.puntoExterior.y);
        pop();
    }


    dibujaBridgeStroke() {
        // Dibuja una linea desde 'y' actual en grafica polar
        // hasta posicion actual en 'y' grafica del tiempo
        push();
        stroke(127);
        line(this.puntoExterior.x,this.puntoExterior.y,this.initPlotTime.x, this.arrayWaveTime[0]+this.initPlotTime.y);
        pop();
    }

    dibujaPolarShape() {
        // Dibuja la grafica de la posicion en 'y' del
        // punto exterior del circulo mas pequeño
        push();
        strokeWeight(3);
        stroke(210,120,50,100);

        beginShape();
        noFill();
        for(let i = 0; i < this.arrayEspyro.length/2; i+=2) {
            // point(this.arrayEspyro[i],this.arrayEspyro[i+1]);
            vertex(this.arrayEspyro[i],this.arrayEspyro[i+1]);
        }
        endShape();
        pop();
    }

    dibujaTimeShape() {
        // Dibuja la grafica de onda con respecto al tiempo
        push();
        strokeWeight(2);
        stroke(200);
        beginShape();
        noFill();
        for(let i = 0; i < this.arrayWaveTime.length; i++) {
            vertex(i+this.initPlotTime.x,this.arrayWaveTime[i]+this.initPlotTime.y);
        }
        endShape();
        pop();
    }

    getArmonicos() {
        return this.resolucion;
    }

    setArmonicos(armonicos) {
        this.resolucion = armonicos;
    }

    getAmp() {
        return this.amp;
    }

    setAmp(amp) {
        this.amp = amp;
    }
    setTimeStep(time) {
        this.timeStep = time;
    }

    changeFunction(numOfFunc) {
        this.funcActual = numOfFunc;
    }

    changeFactor(f) {
        this.factor = f;
    }
}


class PloterFinalFourier extends PloterFourier {
    
    constructor(centroPolarPlot, initTimePlot, amplitude, armonicos) {
        super(centroPolarPlot, initTimePlot, amplitude, armonicos);
        // this.changeFunction(5);
        this.timeStep = 0.02;
    }
    
    actualizar() {
        this.dibujaAxis();
        this.puntoExterior = this.centroPolar.copy();
        this.centroActual = this.puntoExterior.copy();
        this.radio =  this.amp;
        // print(this.resolucion);
        this.puntoExterior.x += (this.radio * cos(this.resolucion * this.tiempo));
        this.puntoExterior.y += (this.radio * sin(this.resolucion * this.tiempo));
        
        this.dibujaPolarStructure();
        
        this.guardaPolar();
        this.guardaTiempo();
        this.dibujaBridgeStroke();
        this.dibujaTimeShape();
        this.dibujaPolarShape();
        // }
        // Actualiza el tiempo en el canvas
        // tiempo += velTime;
        this.tiempo += this.timeStep;
        // print(this.radio);
        // print('');
    }
    
}