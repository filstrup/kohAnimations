var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');var animationManager = new AnimationManager();
var image = new Image();
var ani1 = new Animation();
var ani2 = new Animation();
var ani3 = new Animation();
var ms = 500;
var xSprites = 31;
var ySprites = 21;
var imgLoaded = false;

image.src = 'imgs/anim2.png';

image.onload = function(){
        var w, h;
        w = this.width/xSprites;
        h = this.height/ySprites;

        ani1.startCol = 0;
        ani1.startRow = 0;
        ani1.endCol = 4;
        ani1.endRow = 0;
        ani1.fps = ms;

        ani2.startCol = 0;
        ani2.startRow = 0;
        ani2.endCol = 15;
        ani2.endRow = 5;
        ani2.fps = ms;

        ani3.startCol = 28;
        ani3.startRow = 0;
        ani3.endCol = 3;
        ani3.endRow = 1;
        ani3.fps = ms;
        ani3.loop='reverse';

        animationManager.cols = xSprites - 1;
        animationManager.rows = ySprites - 1;
        animationManager.frameH = h;
        animationManager.frameW = w;
        animationManager.image = this;
        animationManager.imageName = this.name;
        animationManager.addAnimation("1", ani1);
        animationManager.addAnimation("2", ani2);
        animationManager.addAnimation("3", ani3);
        animationManager.setAnimation("3");
        
        imgLoaded = true;
};

/*while(imgLoaded == false){
        
}*/
draw = function(){
        if(imgLoaded == true){
                context.clearRect(0, 0, canvas.width, canvas.height);
                animationManager.drawImmediate(context,0,0);
        }
};
var simulation = setInterval(draw, ms);
//animationManager.drawImmediate(context,0,0);