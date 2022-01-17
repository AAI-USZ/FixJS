function(tweenEvent){
            var currentStyleValue = this.ninjaStylesContoller.getElementStyle(this.animatedElement, this.trackEditorProperty);
            if (currentStyleValue == null) {
                currentStyleValue = "1px";
            }

            this.propTweens[0].tweenData.tweenedProperties[this.trackEditorProperty] = currentStyleValue;

            this.animationName = this.animatedElement.classList[0] + "_" + this.trackEditorProperty;
            var currentAnimationNameString = this.parentComponent.parentComponent.parentComponent.parentComponent.animationNamesString;
            var newAnimationNames = "";
            if(currentAnimationNameString.length == 0){
                newAnimationNames = this.animationName;
            } else {
                newAnimationNames = currentAnimationNameString + "," + this.animationName;
            }
            var currentAnimationDuration = this.ninjaStylesContoller.getElementStyle(this.animatedElement, "-webkit-animation-duration");
            var newAnimationDuration = currentAnimationDuration + "," + currentAnimationDuration;
            var currentIterationCount = this.ninjaStylesContoller.getElementStyle(this.animatedElement, "-webkit-animation-iteration-count");
            var newIterationCount = currentIterationCount + ",1";

            this.parentComponent.parentComponent.parentComponent.parentComponent.animationNamesString = newAnimationNames;

            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-name", newAnimationNames);
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-duration", newAnimationDuration);
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-fill-mode", "forwards");
            this.ninjaStylesContoller.setElementStyle(this.animatedElement, "-webkit-animation-iteration-count", newIterationCount);

            var initRule = "@-webkit-keyframes " + this.animationName + " { 0% {" + this.trackEditorProperty + ": " + currentStyleValue + ";} 100% {" + this.trackEditorProperty + ": " + currentStyleValue + ";} }";
            this.currentKeyframeRule = this.ninjaStylesContoller.addRule(initRule);
            this.insertPropTween(tweenEvent.offsetX);
        }