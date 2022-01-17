function(target) {
    
                // ======================================================================
                // Closure state per tooltip
                
                var bubbleContent;              // tooltip content
                var container;                  // tooltip container node
                var bubble;                     // bubble node
                var stem;                       // stem node
                var attached = false;           // indicates if tooltip is attached to DOM
                var hovered = false;            // indicates if tooltip is currently being hovered
                var basic = true;               // indicates if bubble has basic content (e.g. text only vs. more sophistated markup)
                
                // ======================================================================
                // Helper methods
    
                var initialize = function() {
    
                    // get content
                    if (!props.content) {
                        // use title attribute
                        bubbleContent = target.attr(props.contentAttr);
                    } else if ($.type(props.content) == "function") {
                        // execute function for content
                        bubbleContent = props.content();
                    } else if ($.type(props.content) == "string") {
                        // content supplied as string
                        bubbleContent = props.content;
                    } else {
                        // else content is object (e.g. jQuery/HTML element)
                        bubbleContent = props.content;
                        basic = false;
                    }
                    
                    // initialize container/bubble/stem
                    container = $(JT.MARKUP_TOOLTIP);
                    bubble = container.find(".bubble");
                    stem = container.find(".stem");
    
                    // add content to bubble
                    if (basic) {
                        bubbleContent = $(JT.MARKUP_BASIC_CONTENT).append(bubbleContent);
                    }
                    bubble.append(bubbleContent);
                    
                };
    
                var position = function() {
    
                    // get position and dimensions for target
                    var targetPos = target.offset();
                    var targetW = target.outerWidth(), targetH = target.outerHeight();
                    
                    // calculate positions for tooltip wrapper/bubble/stem
                    var positions = calculatePositions(targetPos, targetW, targetH, props.containment, false);
    
                    // set positions
                    container.css("top", positions.top);
                    container.css("left", positions.left);
                    bubble.css("top", positions.bubbleTop);
                    bubble.css("left", positions.bubbleLeft);
                    if (props.stem) {
                        stem.css("top", positions.stemTop);
                        stem.css("left", positions.stemLeft)
                    } else {
                        stem.hide();
                    }
                    
                    return positions;
                };
                
                var calculatePositions = function(targetPos, targetW, targetH, containment, invert) {
    
                    // invert position & offsets if needed (due to containment)
                    var offset = invert ? invertOffset(props.position, props.offset) : props.offset;
                    var position = invert ? JT.INVERT_DIRECTION[props.position] : props.position;
                    
                    // set direction for stem (inverse of bubble position)
                    var inverseDir = JT.INVERT_DIRECTION[position];
                    stem.removeClass(JT.ALL_DIRECTIONS).addClass(inverseDir);
    
                    // trick to get dimensions of hidden tooltip bubble/stem
                    container.css("visibility", "hidden");
                    container.show();
    
                    // retrieve dimensions
                    if (basic) {
                        // handle widths for basic text content
                        bubble.css("white-space", "nowrap");
                        if (bubble.outerWidth() > props.maxWidth) {
                            bubble.width(props.maxWidth);
                            bubble.css("white-space", "");
                        } 
                    } 
                    var bubbleW = bubble.outerWidth(), bubbleH = bubble.outerHeight();
                    var stemW = props.stem ? stem.outerWidth() : 0, stemH = props.stem ? stem.outerHeight() : 0;
    
                    // undo trick
                    container.css("visibility", "");
                    container.hide();
    
    //                console.log("targetPos " + targetPos.top + " " + targetPos.left + " | targetW " + targetW + " | targetH " + targetH +
    //                            " | bubbleW " + bubbleW + " | bubbleH " + bubbleH + " | stemW " + stemW + " | stemH " + stemH +
    //                            " | offset " + offset.y + " " + offset.x);
                    
                    // calculate positions for tooltip wrapper/bubble/stem
                    var top, left, bubbleTop, bubbleLeft, stemTop, stemLeft;
                    if (position === "top") {
                        top = targetPos.top;
                        left = targetPos.left + (targetW/2);
                        bubbleTop = -(bubbleH + stemH);
                        bubbleLeft = -(bubbleW/2);
                        stemTop = -stemH;
                        stemLeft = -(stemW/2);
                    } else if (position === "right") {
                        top = targetPos.top + (targetH / 2);
                        left = targetPos.left + targetW;
                        bubbleTop = -(bubbleH/2);
                        bubbleLeft = stemW;
                        stemTop = -(stemH/2);
                        stemLeft = 0;
                    } else if (position === "bottom") {
                        top = targetPos.top + targetH;
                        left = targetPos.left + (targetW/2);
                        bubbleTop = stemH;
                        bubbleLeft = -(bubbleW/2);
                        stemTop = 0;
                        stemLeft = -(stemW/2);
                    } else if (position == "left") {
                        top = targetPos.top + (targetH/2);
                        left = targetPos.left;
                        bubbleTop = -(bubbleH/2);
                        bubbleLeft = -(bubbleW + stemW);
                        stemTop = -(stemH/2);
                        stemLeft = -stemW;
                    }
                    
                    // include offsets
                    top += offset.y;
                    left += offset.x;
    
    //                console.log("top " + top + " | left " + left + 
    //                            " | bubbleTop " + bubbleTop + " | bubbleLeft " + bubbleLeft + 
    //                            " | stemTop " + stemTop + " | stemLeft " + stemLeft);
                    
                    // handle containment
                    if (containment) {
                        var viewportW = $(window).width();
                        var viewportH = $(window).height();
                        if (position === "top" && (top - bubbleH - stemH) < 0) {
    //                        console.log("Exceeded: Trying " + inverseDir);
                            return calculatePositions(targetPos, targetW, targetH, false, true);
                        } else if (position === "right" && (left + bubbleW + stemW) > viewportW) {
    //                        console.log("Exceeded: Trying " + inverseDir);
                            return calculatePositions(targetPos, targetW, targetH, false, true);
                        } else if (position == "bottom" && (top + bubbleH + stemH) > viewportH) {
    //                        console.log("Exceeded: Trying " + inverseDir);
                            return calculatePositions(targetPos, targetW, targetH, false, true);
                        } else if (position === "left" && (left - bubbleW - stemW) < 0) {
    //                        console.log("Exceeded: Trying " + inverseDir);
                            return calculatePositions(targetPos, targetW, targetH, false, true);
                        }
                    }
                    
                    return {
                        position : position,
                        top : top,
                        left : left,
                        bubbleTop : bubbleTop,
                        bubbleLeft : bubbleLeft,
                        stemTop : stemTop,
                        stemLeft : stemLeft
                    };
                    
                };
    
                var invertOffset = function(origPosition, offset) {
                    if (origPosition === "top") {
                        return { x : offset.x, y : offset.y * -1 };
                    } else if (origPosition === "right") {
                        return { x : offset.x * -1, y : offset.y };
                    } else if (origPosition === "bottom") {
                        return { x : offset.x, y : offset.y * -1 };
                    } else if (origPosition == "left") {
                        return { x : offset.x * -1, y : offset.y };
                    }
                };
                
                // handler to hide tooltip
                var removeTip = function() {
                    hovered = false;
                    // hide after delay
                    setTimeout(function() {
                        if (!hovered) {
                            // hide by fading out
                            container.animate( { opacity : 0 }, {
                                duration: 200,
                                complete: function() {
                                    container.css("opacity", "");
                                    container.hide();
                                }
                            });
                            
                        }
                    }, props.hideDelay);
                };
    
                // handler to show tooltip
                var showTip = function(event) {
                    hovered = true;
                    // show after delay
                    setTimeout(function() { 
                        if (hovered) {
                            // attach to DOM
                            if (!attached) {
                                $("body").append(container);
                                attached = true;
                            }
                            
                            // position tooltip
                            var positions = position();
                            
                            // show
                            animate(container, props.animateShow, positions.position);
                        }
                        
                    }, props.showDelay);
                };
                
                var animate = function(container, animate, position) {
                    container.css("opacity", 0);
                    var animProps = { opacity : 1 };
                    if (animate) {
                        var animValues = getAnimValues(position);
                        container.css(animValues.property, animValues.start);
                        animProps[animValues.property] = animValues.end;
                    }
                    container.show();
                    container.animate(animProps, {
                        duration: props.animateDur,
                        complete: function() {
                            if (animate) {
                                container.css(animValues.property, "");
                            }
                            container.css("opacity", "");
                        }
                    });
                };
                
                var getAnimValues = function(position) {
                    if (position === "top") {
                        return { property : "margin-top", start : 10, end : 0 };
                    } else if (position === "right") {
                        return { property : "margin-left", start : -10, end : 0 };
                    } else if (position === "bottom") {
                        return { property : "margin-top", start : -10, end : 0 };
                    } else if (position == "left") {
                        return { property : "margin-left", start : 10, end : 0 };
                    }
                };
                
                // ======================================================================
                // Main
    
                // initialize
                initialize();
                
                // bind handlers to target
                target.on("mouseenter", function(e) { showTip(e); });
                target.on("mouseleave", function(e) { removeTip(); });
                
                // bind handlers to tooltip
                container.on("mouseenter", function(e) { hovered = true; });
                container.on("mouseleave", function(e) { removeTip(); });
    
                // return object with client API
                return {
                    destroy : function() {
                        // remove tooltip
                        container.remove();
                        // unbind event handlers from target
                        target.off("mouseenter mouseleave");
                    }
                };
                
            }