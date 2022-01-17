function stop(){
			for(var i in tweens){

					tweens[i].stop();		
			}	
			isanimating = false;
			ispaused = false;
			TWEEN.removeAll();
			restoreTransitions();
			meshesStartingState();		
			tweens = [];
			startTime = 0;
		}