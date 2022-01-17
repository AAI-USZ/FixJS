function () {
            var percentValue, fraction, splitValue,offsetAttribute,topOffSetAttribute,leftOffsetAttribute,widthOffsetAttribute,heightOffsetAttribute;
            var currentMilliSec,currentMilliSecPerPixel,clickPosition,tempTiming,tempTimingFloat,trackTiming,i = 0;

            var selectedIndex = this.application.ninja.timeline.getLayerIndexByID(this.trackID);
            this.application.ninja.timeline.arrLayers[selectedIndex].layerData.created=true;
            this.animatedElement = this.application.ninja.timeline.arrLayers[selectedIndex].layerData.stageElement;
            if(this.animatedElement!==undefined){
                this.animationName = this.application.ninja.stylesController.getElementStyle(this.animatedElement, "-webkit-animation-name");
                // build tweens for this tracks's keyframe rule
                if(this.animationName){
                    // check for multiple animation names
                    var animationNameList = this.animationName.split(",");
                    if (animationNameList.length > 1) {
                        this.animationNamesString = this.animationName;
                        this.animationName = animationNameList[0];
                        this.getAllAnimationRules(animationNameList);
                    } else {
                        this.animationNamesString = this.animationName;
                    }

                    trackTiming = this.application.ninja.stylesController.getElementStyle(this.animatedElement, "-webkit-animation-duration");
                    this.nextKeyframe = 0;

                    this.currentKeyframeRule = this.application.ninja.stylesController.getAnimationRuleWithName(this.animationName, this.application.ninja.currentDocument.model.views.design.document);

                    for (i =0; this.currentKeyframeRule[i] ;i++) {
                        var newTween = {};
                        newTween.tweenData = {};

                        var j, styleLength = this.currentKeyframeRule[i].style.length, keyframeStyles = [];

                        for(j=0; j<styleLength; j++){
                            // check for vendor prefixes and skip them for now
                            var firstChar = this.currentKeyframeRule[i].style[j].charAt(0);
                            if(firstChar === "-"){
                                break;
                            } else {
                                var currProp = this.currentKeyframeRule[i].style[j];
                                var propVal = this.currentKeyframeRule[i].style[currProp];
                                keyframeStyles.push([currProp, propVal]);
                            }
                        }

                        // recreate tween properties array for timeline tween
                        newTween.tweenData.tweenedProperties = [];
                        for(var k in keyframeStyles){
                            newTween.tweenData.tweenedProperties[keyframeStyles[k][0]] = keyframeStyles[k][1];
                        }

                        if (this.currentKeyframeRule[i].keyText === "0%") {
                            newTween.tweenData.spanWidth = 0;
                            newTween.tweenData.keyFramePosition = 0;
                            newTween.tweenData.keyFrameMillisec = 0;
                            newTween.tweenData.tweenID = 0;
                            newTween.tweenData.spanPosition = 0;
                            this.tweens.push(newTween);
                            this.createMatchingPositionSizeTween(newTween);
                        }
                        else {
                            tempTiming = trackTiming.split("s");
                            tempTimingFloat = parseFloat(tempTiming[0]);
                            this.trackDuration = tempTimingFloat *1000;
                            percentValue = this.currentKeyframeRule[i].keyText;
                            splitValue = percentValue.split("%");
                            fraction = splitValue[0] / 100;
                            currentMilliSec = fraction * this.trackDuration;
                            currentMilliSecPerPixel = Math.floor(this.application.ninja.timeline.millisecondsOffset / 80);
                            clickPosition = currentMilliSec / currentMilliSecPerPixel;
                            newTween.tweenData.spanWidth = clickPosition - this.tweens[this.tweens.length - 1].tweenData.keyFramePosition;
                            newTween.tweenData.keyFramePosition = clickPosition;
                            newTween.tweenData.keyFrameMillisec = currentMilliSec;
                            newTween.tweenData.tweenID = this.nextKeyframe;
                            newTween.tweenData.spanPosition =clickPosition - newTween.tweenData.spanWidth;
                            newTween.tweenData.easing = this.currentKeyframeRule[i].style.webkitAnimationName;
                            if (newTween.tweenData.easing == "") {
                            	newTween.tweenData.easing = "none";
                            }
                            this.tweens.push(newTween);
                            this.createMatchingPositionSizeTween(newTween);
                        }
                        this.nextKeyframe += 1;
                    }
                    this.isTrackAnimated = true;
                }
            }
        }