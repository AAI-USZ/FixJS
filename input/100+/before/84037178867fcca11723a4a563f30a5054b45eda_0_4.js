function NPC(name, x, y, direction, speed, path, clothing, talk, talkObj){
	this.animation = 'walk';
	this.x = x;
	this.y = y;
    this.w = 64;
    this.h = 64;
    this.spriteOffset = {x: 0, y: 128};
	this.direction = direction;
	this.name = name;
	this.path = path;
	this.path_progress = 0;
	this.clothes = clothing;
	this.talk = talk;
	this.talkObj = talkObj;
	this.loadClothes();
	this.maxsx = 576;
	this.animating = true;
	this.AIxy = 'x';
	this.speed = speed;
}