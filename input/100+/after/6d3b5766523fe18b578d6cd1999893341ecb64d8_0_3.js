function(dt) { //Update loop
  
    //if (this.mode == 1)

	var i;
	for(i = 0; i < this.particles.length; i++){
		if(this.particles[i] != null)
		{
		    this.particles[i].checkCollision(this.world.getSize());
			this.particles[i].updatePosition(dt);
			//loop through particles
			var j;
			for(j = 0; j < this.particles.length; j++){
				if(i != j){
				    this.simulatePhysics(this.particles[i],this.particles[j]);
				
					if(this.particles[i].checkParticleCollision(this.particles[j])){
							this.particles[j].setPosition(1000,1000); //move offscreen
							this.particles[j].MASS = 0;
							this.particles.splice(j, 1);
							return;
					}
				}
				else{
					this.particles[i].accly = 0;
				}
			}
			
		}
	}
	
	//Button Listners	
	goog.events.listenOnce(this.btnPro, ['touchstart', 'mousedown'], this.spawnProtron, false, this);
	goog.events.listenOnce(this.btnEle, ['touchstart', 'mousedown'], this.spawnElectron, false, this);
	goog.events.listenOnce(this.btnAlp, ['touchstart', 'mousedown'], this.spawnAlpha, false, this);
	
}