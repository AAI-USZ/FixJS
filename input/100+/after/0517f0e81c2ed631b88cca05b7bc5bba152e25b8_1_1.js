function(type){
	lime.Sprite.call(this);
	this.particleType = type;
	this.setSize(10,10);
	this.RADIUS = 10;
    this.SPEED = .45;
	this.setAnchorPoint(.5, 0);
	this.shape = new lime.Circle().setSize(this.RADIUS * 2, this.RADIUS * 2).setFill(200, 0, 0);
	this.appendChild(this.shape);
	this.vx = 0.0;
	this.vy = 0.0;
	this.vxOld = 0.0;
	this.vyOld = 0.0;
	this.posCharge = true;
	this.MASS = 5;
	this.acclx = 0;
	this.accly = -0.1;
	//var type = "protron";
	if(type == 1){ //protron
		this.shape.setFill(200, 0, 0);
		this.posCharge = true;
	}
	else if(type == 2){ //electron
		this.shape.setFill(0, 200, 200);
		this.shape.setSize(this.RADIUS, this.RADIUS);
		this.posCharge = false;	
	}
	else if(type == 3){ //alpha
		this.shape.setFill(0, 0, 200);
		this.shape.setSize(this.RADIUS * 1.5, this.RADIUS * 1.5);
		this.shape2 = new lime.Circle().setSize(this.RADIUS * 1.5, this.RADIUS * 1.5).setFill(200,0,0);
		//this.shape2.setAnchorPoint(0.5, 0.5);
		this.appendChild(this.shape2);
		this.posCharge = false;
	}
	
}