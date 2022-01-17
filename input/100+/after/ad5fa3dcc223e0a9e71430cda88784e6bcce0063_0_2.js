function NPC(name, x, y, direction, AI, clothing, talk, talkObj){
	this.d = 1;
	this.x = x + character.position.x;
	this.y = y + character.position.y;
	this.w = 32;
	this.h = 32;
	this.animate_idx = 0;
	this.direction = direction; // 0 = up, 1 = left, 2 = down, 3 = right
	this.name = name;
	this.AI = AI;
	this.clothing = clothing;
	this.talk = talk;
	this.talkObj = talkObj;
	this.loadClothes();
}