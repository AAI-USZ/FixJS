function animate() {

	        requestAnimationFrame( animate );
	        render();
	        stats.update();
	        TWEEN.update();
				if(lookAtScene){
						camera.lookAt(scene.position);
				}
			if(self.f !== null && self.f !== undefined) {
//				console.log(renderer);
				self.f(renderer.context.canvas);
			}
	    }