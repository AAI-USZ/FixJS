function() {
    	this.renderer.render(this.scene, this.camera);  		

    	var self = this;

    	window.requestAnimationFrame(function() {
    		self.render();
    		stats.update();
    	}, this.renderer.domElement);
    }