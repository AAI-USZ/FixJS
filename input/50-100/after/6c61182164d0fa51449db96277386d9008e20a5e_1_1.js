function() {
    	if (this.destroyed) return;

    	this.renderer.render(this.scene, this.camera);  		

    	var self = this;

    	window.requestAnimationFrame(function() {
    		self.render();
    		self.stats.update();
    	}, this.renderer.domElement);
    }