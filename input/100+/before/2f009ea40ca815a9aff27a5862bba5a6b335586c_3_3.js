function(){
            // delete the current rule
            this.ninjaStylesContoller.deleteRule(this.currentKeyframeRule);

            // build the new keyframe string
            var keyframeString = "@-webkit-keyframes " + this.animationName + " {";

            for (var i = 0; i < this.propTweens.length; i++) {
                var keyMill = parseInt(this.propTweens[i].tweenData.keyFrameMillisec);
                // trackDur should be parseFloat rounded to significant digits
                var trackDur = parseInt(this.trackDuration);
                var keyframePercent = Math.round((keyMill / trackDur) * 100) + "%";
                var keyframePropertyString = " " + keyframePercent + " {";
                for(var prop in this.propTweens[i].tweenData.tweenedProperties){
                    keyframePropertyString += prop + ": " + this.propTweens[i].tweenData.tweenedProperties[prop] + ";";
                }
                keyframePropertyString += "}";
                keyframeString += keyframePropertyString;
            }
            keyframeString += " }";
            // set the keyframe string as the new rule
            this.currentKeyframeRule = this.ninjaStylesContoller.addRule(keyframeString);
            this.application.ninja.currentDocument.model.needsSave = true;
        }