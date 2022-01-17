function ffAnimation(){
		  console.log ("FF");
			startFromSecond(animations,endTime);
			meshesIntermediateState();
			tweens = [];
			startTime = 0;
			isanimating = false;
			ispaused = false;
			TWEEN.removeAll();
			restoreTransitions();
		}