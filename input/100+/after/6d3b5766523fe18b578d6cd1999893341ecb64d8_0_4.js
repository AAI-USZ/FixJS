function(particle1, particle2){	
	
	var posShape1 = particle1.shape.getPosition();
	
	var posShape2 = particle2.shape.getPosition();
	
	var dist = Math.sqrt(Math.pow(posShape2.x - posShape1.x ,2) + Math.pow(posShape2.y - posShape1.y ,2) );
	
	var forceX = this.GRAVITY * ((particle1.MASS * particle2.MASS) / Math.pow(dist, 2));
	var forceY = this.GRAVITY * ((particle1.MASS * particle2.MASS) / Math.pow(dist, 2));
	
	//if the charges are the same, repel instead of attract
	if(particle1.posCharge == particle2.posCharge){
		forceX *= -1;
		forceY *= -1;
	}
	
	particle1.acclx = forceX / particle1.MASS;
	particle1.accly = forceY / particle1.MASS;
	
}