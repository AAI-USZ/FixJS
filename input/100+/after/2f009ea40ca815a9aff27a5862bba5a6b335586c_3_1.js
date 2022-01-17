function(clickPos){
            var selectedIndex,
                currentMillisecPerPixel,
                currentMillisec,
                propVal,
                newTween;

            selectedIndex = this.application.ninja.timeline.getLayerIndexByID(this.trackID);
            this.application.ninja.timeline.selectLayers([selectedIndex]);

            currentMillisecPerPixel = Math.floor(this.application.ninja.timeline.millisecondsOffset / 80);
            currentMillisec = currentMillisecPerPixel * clickPos;
            this.trackDuration = currentMillisec;

            /* Creating a newTween Object */
            newTween = {};
            newTween.tweenData = {};
            newTween.tweenData.tweenedProperties = [];

            /* Getting the Property Style for the animatedElement */

            propVal = this.ninjaStylesContoller.getElementStyle(this.animatedElement, this.trackEditorProperty);
            if(propVal == null){
                propVal = "1px";
            }
            newTween.tweenData.tweenedProperties[this.trackEditorProperty] = propVal;

            if (clickPos == 0) {

                /* Setting the tweenData Properties for the first Keyframe */

                newTween.tweenData.spanWidth = 0;
                newTween.tweenData.keyFramePosition = 0;
                newTween.tweenData.keyFrameMillisec = 0;
                newTween.tweenData.tweenID = 0;
                newTween.tweenData.spanPosition = 0;

                this.propTweens.push(newTween);

            } else {
                newTween.tweenData.spanWidth = clickPos - this.propTweens[this.propTweens.length - 1].tweenData.keyFramePosition;
                newTween.tweenData.keyFramePosition = clickPos;
                newTween.tweenData.keyFrameMillisec = currentMillisec;
                newTween.tweenData.tweenID = this.nextKeyframe;
                newTween.tweenData.spanPosition = clickPos - newTween.tweenData.spanWidth;

                this.propTweens.push(newTween);

                this.nextKeyframe += 1;
            }

            this.application.ninja.currentDocument.model.needsSave = true;
        }