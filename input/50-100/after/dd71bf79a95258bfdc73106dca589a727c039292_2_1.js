function() {


		requestAnimFrame(this.update.bind(this));

		//console.log(self.physicsEngine.getWorld().GetBodyList().GetPosition());

	    this.physicsEngine.update();
	    
	    if(Settings.IS_BROWSER_ENVIRONMENT) {
	    	this.viewController.update();
	    	this.inputControlUnit.update();	
	    	this.me.update();
	    	//self.camera.update();
	    	//self.repository.update();
	    }
	}