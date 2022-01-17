function(declare, lang, domGeom, domStyle, has, scrollWindow, animation) {
        
        
        var Animation = declare(null, {
            
            
            ///////////////////////////////////////////////////////////////////
            // options
            ///////////////////////////////////////////////////////////////////
            
            // amount of scrolling (in delayUnits) from the (delayEdge) of the
            // block crossing the bottom edge of the screen before animation
            // starts.
            delay: 0,
            
            // the units to measure the scroll delay.
            // may be "px" for absolute lengths or "%" for relative lengths
            // of the screen's height, e.g. 25%.
            delayUnits: "%",
            
            // the horizontal edge line of the block from which to measure the
            // delay with respect to the bottom edge of the screen
            // may be a numerical percentage of the block's border-box height,
            // e.g. 50 for the middle of the block, or one of the presets
            // "top" === 0, "bottom" === 100 or "middle" === 50
            delayEdge: 0,
            
            // the overall duration of the animation is the sum of
            // screenDuration and blockDuration.
            // used in combination with "%" units, this makes it easy to 
            // configure an animation that runs from the bottom of the screen 
            // all the way until the block has completely left the screen,
            // i.e. screenDuration === 100% and blockDuration === 100%
            // with delay === 0.
            
            // screen length of scrolling (in screenDurationUnits) over which
            // the animation occurs after the delay from the bottom of the
            // screen has been scrolled through.
            screenDuration: 100,
            
            // the units to measure the screen scroll duration
            // may be "px" for absolute lengths or "%" for relative lengths
            // of the screen's height, e.g. 25%.
            screenDurationUnits: "%",
            
            // block length of scrolling (in blockDurationUnits) over which
            // the animation occurs after the delay from the bottom of the
            // screen has been scrolled through.
            blockDuration: 100,
            
            // the units to measure the block scroll duration
            // may be "px" for absolute lengths or "%" for relative lengths
            // of the block's border-box height, e.g. 25%.
            blockDurationUnits: "%",
            
            // CSS property being animated (must be numerical)
            property: null,
            
            // beginning value of the CSS property
            // (uses current value if not specified)
            begin: null,
            
            // ending value of the CSS property
            // (uses current value if not specified)
            end: null,
            
            // pin the block during the animation's duration?
            pin: false,
            
            // one of the methods from the easing packages
            // (the default, null, uses Linear.easeNone() easing)
            easing: null,
            
            
            ///////////////////////////////////////////////////////////////////
            // internal state
            ///////////////////////////////////////////////////////////////////
            
            // the block in which the animation occurs
            _block: null,
            
            // the DOM node inside the block to which the animation applies
            _node: null,
            
            // the original CSS style properties which may be overwritten
            // for animations
            _styles: null,
            
            // was the block being animated during the last update?
            _animatedLast: false,
            
            
            ///////////////////////////////////////////////////////////////////
            // constructor
            ///////////////////////////////////////////////////////////////////
            
            constructor: function(block, node, options) {
                
                this._block = block;
                this._node = node;
                declare.safeMixin(this, options);
                
                // sanity checks
                if (this._block === null || this._block === undefined) {
                    
                    throw new Error("You must pass a Block instance to the Animation constructor.");
                }
                
                if (this._node === null || this._node === undefined) {
                    
                    throw new Error("You must pass a DOM node to the Animation constructor.");
                }
                
                if (typeof this.delayEdge !== "number" &&
                    this.delayEdge !== "top" &&
                    this.delayEdge !== "middle" &&
                    this.delayEdge !== "bottom"
                ) {
                    
                    throw new Error("The delayEdge option must be a number, \"top\", \"middle\" or \"bottom\".");
                }
                
                if (this.delayUnits !== "px" && this.delayUnits !== "%") {
                    
                    throw new Error("The delayUnits option must be set to \"px\" or \"%\".");
                }
                
                if (this.screenDurationUnits !== "px" && this.screenDurationUnits !== "%") {
                    
                    throw new Error("The screenDurationUnits option must be set to \"px\" or \"%\".");
                }
                
                if (this.blockDurationUnits !== "px" && this.blockDurationUnits !== "%") {
                    
                    throw new Error("The blockDurationUnits option must be set to \"px\" or \"%\".");
                }
                
                if (this.property === null) {
                    
                    throw new Error("You property option must be set to a CSS property name.");
                }
                
                if (this.easing !== null && !lang.isFunction(this.easing)) {
                    
                    throw new Error("The easing option must be set to an easing function or null.");
                }
                
                // initialize the node
                this._initialize();
            },
            
            
            ///////////////////////////////////////////////////////////////////
            // public api
            ///////////////////////////////////////////////////////////////////
            
            // update the node's animation.
            // if the animation is not pinned, return null.
            // otherwise, return the required top and bottom pin margins.
            update: function() {
                
                var 
                    // the screen's position and dimensions
                    screenPosition = scrollWindow.getBox(),
                    screenTopPixel = screenPosition.t,
                    screenBottomPixel = screenTopPixel + screenPosition.h,
                    
                    // the block's position and dimensions
                    blockPosition = domGeom.position(this._block.getNode(), true),
                    
                    // the calculated top and bottom animation pixels
                    animTopPixel,
                    animBottomPixel,
                    
                    // the calculated animation percentage
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
                animTopPixel -= delay;
                
                
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
                
                
                // is the animation on the screen?
                if (animTopPixel <= screenBottomPixel &&
                    animBottomPixel >= screenTopPixel
                ) {
                    
                    // the animation is on the screen
                    
                    // calculate the animation percentage
                    animPercent = duration === 0 ? 1.0 : (screenBottomPixel - animTopPixel) / duration;
                    if (this.easing !== null) {
                        
                        console.log(animPercent);
                        
                        animPercent = this.easing(animPercent, 0, 1, 1);
                    }
                    
                    // set the CSS property value
                    this._setProperty(this.begin + (animPercent * (this.end - this.begin)));
                    
                    // this will have been animated on the previous update
                    this._animatedLast = true;
                    
                } else {
                    
                    // the animation is off the screen
                    
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
            },
            
            
            ///////////////////////////////////////////////////////////////////
            // internal methods
            ///////////////////////////////////////////////////////////////////
            
            // initialize the node, storing its original CSS style property
            _initialize: function() {
                
                var 
                    // the node's computed styles
                    styles = domStyle.getComputedStyle(this._node),
                    
                    // the calculated CSS property value
                    value;
                
                // store up the initial styles
                this._styles = { };
                
                // calculate begin and end values for all property cases
                switch (this.property) {
                    
                    case "top":
                    case "bottom":
                    case "left":
                    case "right":
                        
                        // the node's position should be "relative"
                        if (styles["position"] !== "relative") {
                            
                            this._styles["position"] = styles["position"];
                            domStyle.set(this._node, "position", "relative");
                        }

                        // calculate the begin and end values
                        value = parseInt(styles[this.property]);
                        if (this.begin === null) {
                            this.begin = isNaN(value) ? 0 : value;
                        }
                        if (this.end === null) {
                            this.end = isNaN(value) ? 0 : value;
                        }
                        
                        break;
                    
                    case "rotate":
                        
                        // set begin and end defaults
                        if (this.begin === null) {
                            this.begin = 0;
                        }
                        if (this.end === null) {
                            this.end = 0;
                        }
                        
                        break;
                    
                    case "zoom":
                    case "scale":
                    case "letter-spacing":
                        
                        // set begin and end defaults
                        if (this.begin === null) {
                            this.begin = 1;
                        }
                        if (this.end === null) {
                            this.end = 1;
                        }
                        
                        break;
                    
                    default:
                        
                        // calculate the begin and end values
                        value = parseInt(styles[this.property]);
                        if (this.begin === null) {
                            this.begin = isNaN(value) ? 0 : value;
                        }
                        if (this.end === null) {
                            this.end = isNaN(value) ? 0 : value;
                        }
                        
                        break;
                }
            },
            
            // set the CSS property to the given value
            _setProperty: function(value) {
                
                var position;
                
                switch (this.property) {
                    
                    case "rotate":
                        
                        domStyle.set(this._node, "transform", "rotate(" + value + "deg)");
                        domStyle.set(this._node, Animation.BROWSER_PREFIX + "transform", "rotate(" + value + "deg)");
                        break;
                    
                    case "zoom":
                    case "scale":
                        
                        if (has("ie")) {
                            
                            domStyle.set(this._node, "zoom", (value * 100) + "%");
                            
                        } else {
                            
                            domStyle.set(this._node, "transform", "scale(" + value + ")");
                            domStyle.set(this._node, Animation.BROWSER_PREFIX + "transform", "scale(" + value + ")");
                        }
                        break;
                    
                    case "background-position-x":
                    case "background-position-y":
                        
                        position = domStyle.get(this._node, "backgtround-position").split(" ");
                        if (property === "background-position-x") {
                            
                            domStyle.set(this._node, "background-position", value + "px " + position[1]);
                            
                        } else if (property === "background-position-y") {
                            
                            domStyle.set(this._node, "background-position", position[0] + " " + value + "px");
                        }
                        break;
                    
                    case "text-shadow":
                        
                        domStyle.set(this._node, this.property, "0 0 " + value + "px #fff");
                        break;
                    
                    case "opacity":
                        
                        domStyle.set(this._node, this.property, value);
                        break;
                    
                    default:
                        
                        // use pixels for all other properties
                        domStyle.set(this._node, this.property, value + "px");
                        break;
                }
            }
        });
        
        
        ///////////////////////////////////////////////////////////////////////
        // constants
        ///////////////////////////////////////////////////////////////////////
        
        // the browser prefix for "experimental" CSS properties
        Animation.BROWSER_PREFIX =
            ((has("ff") || has("mozilla")) && "-moz-") ||
            ((has("webkit") || has("chrome") || has("safari")) && "-webkit-") ||
            (has("opera") && "-o-") ||
            (has("ie") && "-ms-") ||
            "";
        
        
        // define the package structure
        animation.Animation = Animation;
        return animation.Animation;
    }