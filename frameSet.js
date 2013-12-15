var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();
//punto de la imagen original desde el que se va a coger la region a representar
var currentX = 0;
var currentY = 0;

//ancho y alto de la region a representar
var sourceWidth;
var sourceHeight;

//deformacion de la imagen (region sobre la que se va a representar, ej: [100, 100] -> [50, 200])
var destWidth;
var destHeight;

//punto del destino desde el que se va a coger la region a representar (por defecto, el origen)
var destX=0;
var destY=0;

//dimensiones de la imagen original (interesante en hojas de sprites)
var totalWidth;
var totalHeight;

//cutrada maxima
var i=0;

//numero de filas y columnas de sprites en la hoja. Por defecto, 1x1
var xSprites=1;
var ySprites=1;

//deformacion a aplicar (por defecto, ninguna)
var xDef=1;
var yDef=1;

//tipo de loop (por defecto: 1 2 3 4 1 2 3 4...)(reverse: 1 2 3 4 3 2 1 2 3 4...
var loopTipe='default';
var ret = false;
//TODO

//sprite de inicio y fin de la animacion
//TODO

//tiempo por frame
var ms = 200;

//imagen
var img;
function move() {
	imageObj.onload = function() {
		//limpiamos el canvas antes de pintar el siguiente frame
		canvas.width = canvas.width;
		//deformacion a aplicar
		destWidth = xDef*sourceWidth;
		destHeight = yDef*sourceHeight;
		//muy cutre, si se saca no funcionan this.width y this.height para saber las dimensiones de la imagen original.
		//al principio, seteamos el ancho y alto de la imagen al total y el ancho y alto de la region a representar dependiendo del nº de sprites en la hoja
		if (i==0){
			totalWidth = this.width;
			totalHeight = this.height;
			sourceWidth = totalWidth/xSprites;
			sourceHeight = totalHeight/ySprites;
			i = 1;
		}
		//si hay mas sprites a lo ancho, los representamos
		//si no, volvemos a la izqda y, si hay mas filas, bajamos una
		//si no, estamos en la esquina inferior derecha -> volvemos al principio
		if (currentX + sourceWidth < totalWidth)
			currentX += sourceWidth;
		else if (currentY + sourceHeight < totalHeight){
			currentX = 0;
			currentY += sourceHeight;
		}
		else {
			currentX = 0;
			currentY = 0;
		}
		//pintamos el frame que toca
		context.drawImage(imageObj, currentX, currentY, sourceWidth,
				sourceHeight, destX, destY, destWidth, destHeight);
	};
	//lugar de la imagen
	imageObj.src = img;
}