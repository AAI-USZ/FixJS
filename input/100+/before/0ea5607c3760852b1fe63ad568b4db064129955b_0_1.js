function (clickPos) {
            var currentMillisecPerPixel = Math.floor(this.application.ninja.timeline.millisecondsOffset / 80);
            var currentMillisec = currentMillisecPerPixel * clickPos;
            this.trackDuration = currentMillisec;
            var newTween = {};
            newTween.tweenData = {};

            if (clickPos == 0) {
                this.animatedElement = this.application.ninja.timeline.arrLayers[this.application.ninja.timeline.currentLayersSelected[0]].layerData.stageElement;
                newTween.tweenData.spanWidth = 0;
                newTween.tweenData.keyFramePosition = 0;
                newTween.tweenData.keyFrameMillisec = 0;
                newTween.tweenData.tweenID = 0;
                newTween.tweenData.spanPosition = 0;
                newTween.tweenData.easing = "none";
                newTween.tweenData.tweenedProperties = [];
                newTween.tweenData.tweenedProperties["top"] = this.animatedElement.offsetTop + "px";
                newTween.tweenData.tweenedProperties["left"] = this.animatedElement.offsetLeft + "px";
                newTween.tweenData.tweenedProperties["width"] = this.animatedElement.offsetWidth + "px";
                newTween.tweenData.tweenedProperties["height"] = this.animatedElement.offsetHeight + "px";
                this.tweens.push(newTween);

                this.createMatchingPositionSizeTween(newTween);

            } else {
                newTween.tweenData.spanWidth = clickPos - this.tweens[this.tweens.length - 1].tweenData.keyFramePosition;
                newTween.tweenData.keyFramePosition = clickPos;
                newTween.tweenData.keyFrameMillisec = currentMillisec;
                newTween.tweenData.tweenID = this.nextKeyframe;
                newTween.tweenData.spanPosition = clickPos - newTween.tweenData.spanWidth;
                newTween.tweenData.easing = "none";
                newTween.tweenData.tweenedProperties = [];
                newTween.tweenData.tweenedProperties["top"] = this.animatedElement.offsetTop + "px";
                newTween.tweenData.tweenedProperties["left"] = this.animatedElement.offsetLeft + "px";
                newTween.tweenData.tweenedProperties["width"] = this.animatedElement.offsetWidth + "px";
                newTween.tweenData.tweenedProperties["height"] = this.animatedElement.offsetHeight + "px";
                this.tweens.push(newTween);

                // update the animation duration
                var animationDuration = (this.trackDuration / 1000) + "s";
                this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-duration", animationDuration);
                this.nextKeyframe += 1;

                this.createMatchingPositionSizeTween(newTween);
            }

            this.application.ninja.currentDocument.model.needsSave = true;
        }