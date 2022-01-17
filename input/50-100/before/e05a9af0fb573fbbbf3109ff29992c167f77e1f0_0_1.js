function setupScene(width, height, storyboard){

//			createMeshes();
			//sovrapponiEffetti(animations);
			
			animations = [];
			tweens = [];
			cameras = [];
			
		  	init(width, height, storyboard);

		  saveOriginalState();
		  
			isanimating = false;
			ispaused = false;
			TWEEN.removeAll();
		
				if (!isRunning) {
					renderingAnimate();
					
					isRunning = true;
				}
				
			meshesStartingState();
		    

		}