function NPC(name, x, y, direction, speed, path, clothing, talk, talkObj){
	this.animation = 'walk';
	this.initAsRect(x,y,64,64);
    this.sx= 0;
    this.sy = 128;
	this.direction = direction;
	this.name = name;
	this.path = path;
	this.path_progress = 0;
	this.clothes = clothing;
	this.talk = talk;
	this.talkObj = talkObj;
	this.maxsx = 576;
	this.animating = true;
	this.AIxy = 'x';
	this.speed = speed;
}