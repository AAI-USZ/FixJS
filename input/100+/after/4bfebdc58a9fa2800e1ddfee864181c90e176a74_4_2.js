function() {
            if (this.selectedKeyframe != null && this.selectedKeyframe.parentElement != null) {
                var kfParent = this.selectedKeyframe.parentElement;
                var obj;
                // Find displayObject by keyframe
                for (var key in this.stageObjects) {
                    obj = this.stageObjects[key];
                    if (obj["timelineNode"] != null && obj["timelineNode"][0] == kfParent) {
                        break;
                    }
                    
                }
                
                if (obj["timelineNode"] != null && obj["timelineNode"][0] == kfParent) {
                    if (obj["tween"] != null) {
                        var keyframes = obj["tween"];
                        var kfPos = this.fitToGrid(this.keyframePos); // The id of the keyframe ist the original position
                        var newKfPos = this.fitToGrid(this.selectedKeyframe.offsetLeft);
                        var kfId = kfPos / this.gridSize + 1;
                        var newKfId = newKfPos / this.gridSize + 1;
                        keyframes[newKfId] = keyframes[kfId]; // set the new pos
                        if (newKfId != kfId) {
                        	delete keyframes[kfId];
                        	var bezier = this.linearBezier;
                        	if (keyframes[newKfId]["timingFunc"] != null) {
		                    	bezier = CubicBezier.readTimingFunc(keyframes[newKfId]["timingFunc"]);
		                    }
                        	this.calculateInbetween(obj.displObj.getId(), newKfId, keyframes, this.activeScene, true, true, false, bezier);
                        }
                        
                    }
                }
            }
                
        }