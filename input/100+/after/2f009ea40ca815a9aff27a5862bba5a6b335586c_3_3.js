function(){
            var keyframeString,
                keyMill,
                trackDur,
                keyframePercent,
                keyframePropertyString,
                prop;

            this.ninjaStylesContoller.deleteRule(this.currentKeyframeRule);

            // build the new keyframe string
            keyframeString = "@-webkit-keyframes " + this.animationName + " {";

            for (i = 0; i < this.propTweens.length; i++) {
                keyMill = parseInt(this.propTweens[i].tweenData.keyFrameMillisec);
                trackDur = parseInt(this.trackDuration);
                keyframePercent = Math.round((keyMill / trackDur) * 100) + "%";
                keyframePropertyString = " " + keyframePercent + " {";
                for(prop in this.propTweens[i].tweenData.tweenedProperties){
                    keyframePropertyString += prop + ": " + this.propTweens[i].tweenData.tweenedProperties[prop] + ";";
                }
                keyframePropertyString += "}";
                keyframeString += keyframePropertyString;
            }
            keyframeString += " }";
            this.currentKeyframeRule = this.ninjaStylesContoller.addRule(keyframeString);
            this.application.ninja.currentDocument.model.needsSave = true;
        }