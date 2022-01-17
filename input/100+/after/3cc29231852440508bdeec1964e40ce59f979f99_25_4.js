function(tweenEvent){

            /* Adding the style property as an animation rule to the animatedElement */

            var currentStyleValue,
                currentAnimationNameString,
                newAnimationNames,
                currentAnimationDuration,
                newAnimationDuration,
                currentIterationCount,
                newIterationCount,
                initRule;

            /* Retrieveing the current style value on the animatedElement */
            currentStyleValue = this.ninjaStylesContoller.getElementStyle(this.animatedElement, this.trackEditorProperty);
            if (currentStyleValue == null) {
                currentStyleValue = "1px";
            }
            this.propTweens[0].tweenData.tweenedProperties[this.trackEditorProperty] = currentStyleValue;
            this.animationName = this.animatedElement.classList[0] + "_" + this.trackEditorProperty;
            currentAnimationNameString = this.timelineTrack.animationNamesString;
            newAnimationNames = "";
            if(currentAnimationNameString.length == 0){
                newAnimationNames = this.animationName;
            } else {
                newAnimationNames = currentAnimationNameString + "," + this.animationName;
            }
            currentAnimationDuration = this.ninjaStylesContoller.getElementStyle(this.animatedElement, "-webkit-animation-duration");
            newAnimationDuration = currentAnimationDuration + "," + currentAnimationDuration;
            currentIterationCount = this.ninjaStylesContoller.getElementStyle(this.animatedElement, "-webkit-animation-iteration-count");
            newIterationCount = currentIterationCount + ",1";

            this.timelineTrack.animationNamesString = newAnimationNames;

            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-name", newAnimationNames);
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-duration", newAnimationDuration);
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-fill-mode", "forwards");
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-iteration-count", newIterationCount);

            /* Creating the animation rule */
            initRule = "@-webkit-keyframes " + this.animationName + " { 0% {" + this.trackEditorProperty + ": " + currentStyleValue + ";} 100% {" + this.trackEditorProperty + ": " + currentStyleValue + ";} }";
            this.currentKeyframeRule = this.ninjaStylesContoller.addRule(initRule);
            this.insertPropTween(tweenEvent.offsetX);
        }