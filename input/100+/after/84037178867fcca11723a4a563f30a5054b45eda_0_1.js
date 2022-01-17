function Monster(opts){
    this.name = opts.name;
	this.d = 1;
	this.initAsRect(opts.x, opts.y, 32, 32);
	this.sprite = new Image();
	this.sprite.src = 'public/graphics/' + opts.name + '.png';
	this.animate_idx = 0;
	this.direction = opts.direction;
	this.speed = opts.speed;
	this.HP = opts.HP;
	this.damage = opts.damage;
	this.sensing = opts.sensing;
	this.AI = opts.AI;
	this.AIxy = 'x';
}