function(type){
	lime.Sprite.call(this);
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
	if(type == 1){
		this.shape.setFill(200, 0, 0);
		this.posCharge = true;
	}
	else if(type == 2){
		this.shape.setFill(0, 0, 200);
		this.shape.setSize(this.RADIUS * 1.5, this.RADIUS * 1.5);
		this.posCharge = false;
	}
	else if(type == 3){
		this.shape.setFill(0, 200, 200);
		this.shape.setSize(this.RADIUS, this.RADIUS);
		
	}
	
}