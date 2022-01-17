function (options) {
        'use strict';
        var resizeDelay,
            currentBreakPoint,
            that = this,
            resizeFirer;
            
        this.setOptions(options);
        

        
        resizeFirer = function () {
                var i = 0,
                    windowSize = window.getSize(),
                    rangeLow,
                    rangeHigh;
                //test if still in currentBreakPoint
                while(i <= (that.options.breakPoints.length-1)) {
                    rangeLow = that.options.breakPoints[i];

                    if (that.options.breakPoints[i+1] === undefined) {
                        rangeHigh = screen.width;
                    } else {
                        rangeHigh = that.options.breakPoints[i+1];
                    }
                    
                    if (windowSize.x > rangeLow && windowSize.x <= rangeHigh) {
                        
                        if (rangeHigh !== currentBreakPoint) {

                            window.fireEvent('onWidthLeave'+currentBreakPoint,[currentBreakPoint,rangeHigh, windowSize.x]);
                            currentBreakPoint = rangeHigh;
                            
                            window.fireEvent('onWidthEnter'+currentBreakPoint,[currentBreakPoint,windowSize.x]);
                        }
                        
                    }
                    
                    i += 1;
                }
                
                if(that.options.delayedResizeEvent) {
                    window.fireEvent('onDelayedResize', windowSize);
                }
               
            };
        
        
        if (this.options.breakPoints[0] !== 0) {
            this.options.breakPoints.unshift(0);
        }
        this.options.breakPoints.sort();
        
        if (this.options.measureAtDomReady === true) {
            window.addEvent('domready',function() {
                resizeFirer();
            });
        }
        
        window.addEvent('resize', function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(that.options.delay);
        });
    }