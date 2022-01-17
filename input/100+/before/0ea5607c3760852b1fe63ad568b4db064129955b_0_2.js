function (position) {
            var i, j, nextComponentIndex,
            	tweensLength = this.tweens.length-1,
            	prevTween, 
            	nextTween, 
            	splitTweenIndex;

			// Search through the tweens and find the pair whose keyframes bracket position.
            for(i=0; i<tweensLength; i++){
                prevTween = this.tweens[i].tweenData.keyFramePosition;
                nextTween = this.tweens[i+1].tweenData.keyFramePosition;
                if(position > prevTween && position < nextTween) {
                	
                	// We will insert a new tween at this index
                    splitTweenIndex = i+1;

					// Update the next tween to have new span position and width.
                    this.tweens[i+1].tweenData.spanPosition = position;
                    this.tweens[i+1].spanPosition = position;
                    this.tweens[i+1].tweenData.spanWidth = this.tweens[i+1].tweenData.keyFramePosition - position;
                    this.tweens[i+1].spanWidth = this.tweens[i+1].keyFramePosition - position;
                    
                    // You'd think that would be enough to make the component associated with that part of the array redraw, wouldn't you?
                    // Turns out we have to manually poke the desired childComponent in the repetition to register its new changes.
                    // So we have to get the index of the actual componentin the repetition, which may not match our iteration index.
                    for (j = 0; j < tweensLength +1; j++) {
                    	if (this.tweenRepetition.childComponents[j].keyFramePosition === nextTween) {
                    		nextComponentIndex = j;
                    	}
                    }
                    this.tweenRepetition.childComponents[nextComponentIndex].setData();

					// Create the new tween and splice it into the model
                    var newTweenToInsert = {};
                    newTweenToInsert.tweenData = {};
                    newTweenToInsert.tweenData.spanWidth = position - prevTween;
                    newTweenToInsert.tweenData.keyFramePosition = position;
                    newTweenToInsert.tweenData.keyFrameMillisec = Math.floor(this.application.ninja.timeline.millisecondsOffset / 80) * position;
                    newTweenToInsert.tweenData.tweenID = this.tweens.length;
                    newTweenToInsert.tweenData.spanPosition = position - newTweenToInsert.tweenData.spanWidth;
                    newTweenToInsert.tweenData.tweenedProperties = [];
                    newTweenToInsert.tweenData.tweenedProperties["top"] = this.animatedElement.offsetTop + "px";
                    newTweenToInsert.tweenData.tweenedProperties["left"] = this.animatedElement.offsetLeft + "px";
                    newTweenToInsert.tweenData.tweenedProperties["width"] = this.animatedElement.offsetWidth + "px";
                    newTweenToInsert.tweenData.tweenedProperties["height"] = this.animatedElement.offsetHeight + "px";
                    this.tweens.splice(splitTweenIndex, 0, newTweenToInsert);
                    
                    // We are done, so end the loop.
                    i = tweensLength;
                }
            }
            
            // We've made a change, so set the needsSave flag
            this.application.ninja.currentDocument.model.needsSave = true;
            
            // Our tween IDs are now all messed up.  Fix them.
            for (i = 0; i <= tweensLength+1; i++) {
				this.tweens[i].tweenID = i;
				this.tweens[i].tweenData.tweenID = i;
			}
        }