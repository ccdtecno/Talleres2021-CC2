# Talleres2021-CC2

Aquí se puede encontrar el código y la información del taller "Sonido y web" del Centro de Cultura Digital.
Interactúa con el código en:
https://ccdtecno.github.io/Talleres2021-CC2/


Para ejecutar la pagina web de manera local se necesita tener **node.js** y **browser-sync** instalados.

En caso de no tenerlos instalados ejecutar en la terminal:
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
Una vez instalado node, agragar el paquete de npm:
```
npm install -g browser-sync
```


Descarga el código y ve a la carpeta descargada
```
git clone https://github.com/ccdtecno/Talleres2021-CC2.git
cd Talleres2021-CC2
```
Monta el servidor local:
```
browser-sync --start server
```


