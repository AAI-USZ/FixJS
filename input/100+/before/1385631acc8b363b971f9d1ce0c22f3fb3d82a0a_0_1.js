function renderingAnimate() {

          
	        requestAnimationFrame( renderingAnimate );
	        render();
	        //stats.update();
	        TWEEN.update();
				if(lookAtScene){
						camera.lookAt(scene.position);
				}
				checkEndAnimation();


			var date = new Date();

			if(isRecording){
				if(startRecTime + endTime > date){

				self.f = undefined;
				stop();
				isRecording = false;

				}
			}
			
				
			if(self.f !== null && self.f !== undefined) {
//				console.log(renderer);
				self.f(renderer.context.canvas);
			}
	    }