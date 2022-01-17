function(){
            var j,k,i,percentValue,
                fraction,
                splitValue,
                styleLength,
                firstChar,
                currProp,
                propVal ,
                currentMilliSec,
                currentMilliSecPerPixel,
                clickPosition,
                tempTiming,
                tempTimingFloat,
                trackTiming,
                keyframeStyles,
                newTween;

            if (this.animatedElement !== undefined) {
                this.animationName = this.currentKeyframeRule.name;
                if (this.animationName) {

                    trackTiming = this.application.ninja.stylesController.getElementStyle(this.animatedElement, "-webkit-animation-duration");
                    this.nextKeyframe = 0;

                    /* Traverse through the currentKeyFrameRule for the animatedElement */

                    for (i = 0; this.currentKeyframeRule[i]; i++) {
                        newTween = {};
                        newTween.tweenData = {};

                        styleLength = this.currentKeyframeRule[i].style.length;
                        keyframeStyles = [];

                        /* Traversering through the style of the currentKeyFrameRule of the animatedElement */
                        for (j = 0; j < styleLength; j++) {

                            firstChar = this.currentKeyframeRule[i].style[j].charAt(0);
                            if (firstChar === "-") {
                                break;
                            } else {
                                currProp = this.currentKeyframeRule[i].style[j];
                                propVal = this.currentKeyframeRule[i].style[currProp];
                                keyframeStyles.push([currProp, propVal]);
                            }
                        }

                        newTween.tweenData.tweenedProperties = [];
                        for (k in keyframeStyles) {
                            newTween.tweenData.tweenedProperties[keyframeStyles[k][0]] = keyframeStyles[k][1];
                        }

                        if (this.currentKeyframeRule[i].keyText === "0%") {

                            /* Setting the tweenData Property for only the first Keyframe */
                            newTween.tweenData.spanWidth = 0;
                            newTween.tweenData.keyFramePosition = 0;
                            newTween.tweenData.keyFrameMillisec = 0;
                            newTween.tweenData.tweenID = 0;
                            newTween.tweenData.spanPosition = 0;
                            this.propTweens.push(newTween);
                        }
                        else {

                            tempTiming = trackTiming.split("s");
                            tempTimingFloat = parseFloat(tempTiming[0]);
                            this.trackDuration = tempTimingFloat * 1000;
                            percentValue = this.currentKeyframeRule[i].keyText;
                            splitValue = percentValue.split("%");
                            fraction = splitValue[0] / 100;
                            currentMilliSec = fraction * this.trackDuration;
                            currentMilliSecPerPixel = Math.floor(this.application.ninja.timeline.millisecondsOffset / 80);
                            clickPosition = currentMilliSec / currentMilliSecPerPixel;
                            newTween.tweenData.spanWidth = clickPosition - this.propTweens[this.propTweens.length - 1].tweenData.keyFramePosition;
                            newTween.tweenData.keyFramePosition = clickPosition;
                            newTween.tweenData.keyFrameMillisec = currentMilliSec;
                            newTween.tweenData.tweenID = this.nextKeyframe;
                            newTween.tweenData.spanPosition = clickPosition - newTween.tweenData.spanWidth;
                            this.propTweens.push(newTween);
                        }
                        this.nextKeyframe += 1;
                    }
                }
            }
        }