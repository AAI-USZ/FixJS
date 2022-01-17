function() {
                
                var 
                    // the screen's position and dimensions
                    screenPosition = scrollWindow.getBox(),
                    screenTopPixel = screenPosition.t,
                    screenBottomPixel = screenTopPixel + screenPosition.h,
                    
                    // the block's position and dimensions
                    blockPosition = domGeom.position(this._block.getNode(), true),
                    
                    // the calculated top animation pixel and percentage
                    animTopPixel,
                    animPercent,
                    
                    // the calculated top and bottom pinning offsets
                    pinTop,
                    pinBottom,
                    
                    // the calculated delay edge and delay offsets
                    delayEdge,
                    delay,
                    
                    // the calculated duration offset
                    duration;
                    
                
                // calculate the top animation pixel
                animTopPixel = blockPosition.y;
                
                // calculate and add the delay edge offset
                switch (this.delayEdge) {
                    
                    case "top":
                        
                        delayEdge = 0;
                        break;
                    
                    case "middle":
                        
                        delayEdge = 0.5;
                        break;
                    
                    case "bottom":
                        
                        delayEdge = 1.0;
                        break;
                    
                    default:
                        
                        // convert percentage to decimal
                        delayEdge = 0.01 * this.delayEdge;
                        break;
                }
                delayEdge = Math.round(delayEdge * blockPosition.h);
                animTopPixel += delayEdge;
                
                // calculate and add the delay offset
                delay = 0;
                switch (this.delayUnits) {
                    
                    case "px":
                        
                        delay = this.delay;
                        break;
                    
                    case "%":
                        
                        // convert percentage to decimal
                        delay = Math.round(0.01 * this.delay * screenPosition.h);
                        break;
                }
                animTopPixel += delay;
                
                
                // calculate the bottom animation pixel
                animBottomPixel = animTopPixel;
                
                // calculate and add the screen duration offset
                duration = 0;
                switch (this.screenDurationUnits) {
                    
                    case "px":
                        
                        duration = this.screenDuration;
                        break;
                    
                    case "%":
                        
                        // convert percentage to decimal
                        duration = Math.round(0.01 * this.screenDuration * screenPosition.h);
                        break;
                }
                
                // calculate and add the block duration offset
                switch (this.blockDurationUnits) {
                    
                    case "px":
                        
                        duration += this.blockDuration;
                        break;
                    
                    case "%":
                        
                        // convert percentage to decimal
                        duration += Math.round(0.01 * this.blockDuration * blockPosition.h);
                }
                animBottomPixel += duration;
                
                
                // calculate the animation percentage and update
                animPercent = duration === 0 ? 1.0 : (screenBottomPixel - animTopPixel) / duration;
                
                // is the animation currently running?
                if (animPercent >= 0.0 && animPercent <= 1.0) {
                    
                    // the animation is running
                    
                    // update the percentage with easing
                    if (this.easing !== null) {
                        
                        animPercent = this.easing(animPercent, 0, 1, 1);
                    }
                    
                    // set the CSS property value
                    this._setProperty(this.begin + (animPercent * (this.end - this.begin)));
                    
                    // this will have been animated on the previous update
                    this._animatedLast = true;
                    
                } else {
                    
                    // the animation is not running
                    
                    // if we animated on the previous update,
                    // set the begin or end CSS property value
                    if (this._animatedLast) {
                        
                        if (animTopPixel > screenBottomPixel) {
                            
                            // the animation has yet to begin
                            this._setProperty(this.begin);
                            
                        } else if (animBottomPixel < screenTopPixel) {
                            
                            // the animation is already over
                            this._setProperty(this.end);
                        }
                    }
                    
                    // this will no longer have been animated on the previous update
                    this._animatedLast = false;
                }
                
                
                // calculate and return pinning data?
                if (this.pin) {
                    
                    pinTop = Math.max(0, screenBottomPixel - animTopPixel);
                    pinBottom = pinTop + duration;
                    
                    return {
                        top: pinTop,
                        bottom: pinBottom
                    };
                
                } else {
                    
                    // no pinning to worry about
                    return null;
                }
            }