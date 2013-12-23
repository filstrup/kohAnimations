'use strict';

function Animation()
{   
	this.fps = 30;

	this.startCol = 0;
	this.startRow = 0;
	this.endCol = 0;
	this.endRow = 0;
	this.currentCol = 0;
	this.currentRow = 0;

	this.xDef = 1;
	this.yDef = 1;

	this.loop = 'default';
	this.dir = 1;
}

Animation.prototype.initAnimationFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
	this.currentCol = jsonObj.currentCol;
	this.currentRow = jsonObj.currentRow;
	this.fps = jsonObj.fps;
	this.xDef = jsonObj.xDef;
	this.yDef = jsonObj.yDef;
	this.startCol = jsonObj.startCol;
	this.startRow = jsonObj.startRow;
	this.endCol = jsonObj.endCol;
	this.endRow = jsonObj.endRow;
	this.loop = jsonObj.loop;
	this.dir = jsonObj.dir;
};

function AnimationManager()
{   
	this.image;
	this.imageName;
	this.frameW;
	this.frameH;
	this.cols = 1;
	this.rows = 1;
	this.timeBetweenframes;
	this.timeSinceLastframe;
	this.animations = [];
	this.currentAnimation;
}

AnimationManager.prototype.initAnimationManagerFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
	this.image = jsonObj.image;
	this.imageName = jsonObj.imageName;
	this.frameW = jsonObj.frameW;
	this.frameH = jsonObj.frameH;
	this.cols = jsonObj.cols;
	this.rows = jsonObj.rows;
	this.timeBetweenframes = jsonObj.timeBetweenframes;
	this.timeSinceLastframe = jsonObj.timeSinceLastframe;
	this.currentAnimation = jsonObj.currentAnimation;
};

AnimationManager.prototype.addAnimation = function(name, animation)
{
	this.animations[name] = animation;
};

AnimationManager.prototype.setAnimation = function(name)
{
	this.timeBetweenframes = 1/this.animations[name].fps;
	this.timeSinceLastframe = this.timeBetweenframes;
	this.currentAnimation = name;
	this.animations[name].currentCol = this.animations[name].startCol;
	this.animations[name].currentRow = this.animations[name].startRow;
};
AnimationManager.prototype.move = function(animation)
{
	if(animation.loop == 'default'){
		if (animation.currentRow < animation.endRow){
			if (animation.currentCol < this.cols)
				animation.currentCol += 1;
			else{
				animation.currentCol = 0;
				animation.currentRow +=1;
			}

		}
		else if (animation.currentRow == animation.endRow){
			if(animation.currentCol < animation.endCol)
				animation.currentCol += 1;
			else{
				animation.currentCol = animation.startCol;
				animation.currentRow = animation.startRow;
			}
		}
	}
	else if (animation.loop == 'reverse'){
		if (animation.dir == 1){
			if (animation.currentRow < animation.endRow){
				if (animation.currentCol < this.cols)
					animation.currentCol += 1;
				else{
					animation.currentCol = 0;
					animation.currentRow +=1;
				}

			}
			else if (animation.currentRow == animation.endRow){
				if(animation.currentCol < animation.endCol)
					animation.currentCol += 1;
				else{
					if(animation.currentCol > 0){
						animation.currentCol -= 1;
						animation.dir = -1;
					}
					else{
						animation.currentCol = this.cols;
						animation.currentRow -= 1;
						animation.dir = -1;
					}
				}
			}
		}
		else if (animation.dir == -1){
			if (animation.currentRow > animation.startRow){
				if (animation.currentCol > 0)
					animation.currentCol -= 1;
				else{
					animation.currentCol = this.cols;
					animation.currentRow -=1;
				}

			}
			else if (animation.currentRow == animation.startRow){
				if(animation.currentCol > animation.startCol)
					animation.currentCol -= 1;
				else{
					if(animation.currentCol < this.cols){
						animation.currentCol += 1;
						animation.dir = 1;
					}
					else{
						animation.currentCol = 0;
						animation.currentRow += 1;
						animation.dir = 1;
					}
				}
			}
		}
	}	
};
AnimationManager.prototype.draw = function(dt, context, x, y)
{
	var animation = this.animations[currentAnimation];
	var destW = animation.xDef*this.frameW;
	var destH = animation.yDef*this.frameH;

	var sourceX = this.frameW * animation.currentCol;
	var sourceY = this.frameH * animation.currentRow;

	context.drawImage(this.image, sourceX, sourceY, this.frameW,
			this.frameH, x, y, destW, destH);

	this.timeSinceLastframe -= dt;

	if (this.timeSinceLastframe <= 0)
	{
		this.move(animation);
	}
};

AnimationManager.prototype.drawImmediate = function(context, x, y)
{
	var animation = this.animations[this.currentAnimation];
	var destW = animation.xDef*this.frameW;
	var destH = animation.yDef*this.frameH;

	var sourceX = this.frameW * animation.currentCol;
	var sourceY = this.frameH * animation.currentRow;

	context.drawImage(this.image, sourceX, sourceY, this.frameW,
			this.frameH, x, y, destW, destH);

	this.move(animation);
};