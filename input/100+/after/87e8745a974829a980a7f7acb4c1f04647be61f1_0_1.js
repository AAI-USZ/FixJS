function (stageObject, keyframeId, animParams, scene, init) {
            var stageObjectId = stageObject.getId();
            if (scene === undefined) {
                scene = this.defaultScene;
            }
            if (this.activeScene === undefined) {
                this.activeScene = this.defaultScene;
            }
            if (keyframeId >= 1 && animParams !== undefined) {
            	var bezier = this.linearBezier;
            	if (this.stageObjects[stageObjectId][scene][keyframeId] != null && this.stageObjects[stageObjectId][scene][keyframeId]["timingFunc"] != null) {
                	bezier = CubicBezier.readTimingFunc(this.stageObjects[stageObjectId][scene][keyframeId]["timingFunc"]);
                }
            	
                this.calculateInbetween(stageObjectId, keyframeId, animParams, scene, true, !init, false, bezier); // if the keyframes are initialized the keyframes don't need to be searched forwards
            }
            if (!init) { // If this is not the initial appending of the keyframes we have to add our keyframe to the stage object
                var animObj = stageObject;
                while(animObj !== undefined && animObj !== null && !(animObj instanceof AnimObject)) {
                    animObj = animObj.getParent();
                }
                if (animObj === undefined) {
                    animObj = this.stage;
                }
                if (animObj.animations[scene] !== undefined && (animObj.animations[scene]["tween"] === undefined || animObj.animations[scene]["tween"][stageObjectId] === undefined)) {
                    if (animObj.animations[scene]["tween"] === undefined) {
                        animObj.animations[scene]["tween"] = {};
                    }
                    animObj.animations[scene]["tween"][stageObjectId] = {};
                    this.stageObjects[stageObjectId][scene] = animObj.animations[this.activeScene]["tween"][stageObjectId];
                }
            
                this.stageObjects[stageObjectId][scene][keyframeId] = {}; // stageObjects["armL"]["idle"]
            }
            var keyframeNode = $('<div class="keyframe" style="left: ' + ((keyframeId - 1) * this.gridSize) + 'px;"></div>');
            keyframeNode.on("mousedown", this, function (e) {
                e.data.onKFMouseDown(e);
                var lastKf = e.data.selectedKeyframe;
                if (e.data.selectedKeyframe != null) {
                	dojo.removeClass(e.data.selectedKeyframe, "selected");
                }
                e.data.selectedKeyframe = this; // set the selected keyframe to the current selected div
                if (e.data.selectedKeyframe == lastKf) {
                	e.data.deselectKeyframe = true;
                }
            });
            this.stageObjects[stageObjectId]["timelineNode"].append(keyframeNode);
        }