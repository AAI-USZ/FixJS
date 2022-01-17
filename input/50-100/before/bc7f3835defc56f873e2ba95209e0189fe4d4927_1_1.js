function ffAnimation(){
			startFromSecond(animations,endTime);
			meshesIntermediateState();
			tweens = [];
			startTime = 0;
			isanimating = false;
			ispaused = false;
			TWEEN.removeAll();
			restoreTransitions();
		}