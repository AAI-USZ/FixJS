function setupScene(width, height, storyboard){

//			createMeshes();
			//sovrapponiEffetti(animations);
			
			animations = [];
			tweens = [];
			cameras = [];
			animationsCopy = [];
			
			endTime = storyboard.TMax;
		  	init(width, height, storyboard);

		  	for(var i in storyboard.events){
		  		var ev = storyboard.events[i];
		  		if (ev.description === "End of the animation."){
		  			endTime = ev.tMax;
		  		}
		  	}

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