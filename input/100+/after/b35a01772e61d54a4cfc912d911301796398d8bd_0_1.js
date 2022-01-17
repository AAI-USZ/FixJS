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
                    fired = false;
                
                while((i <= (that.options.breakPoints.length -1)) && (!fired)) {
                    if ((windowSize.x <= that.options.breakPoints[i])  && (that.options.breakPoints[i] !== currentBreakPoint)) {
                        
                        if (currentBreakPoint !== that.options.breakPoints[i]) {
                            window.fireEvent('onWidthLeave' + currentBreakPoint, [currentBreakPoint, windowSize]);
                        }
        
                        window.fireEvent('onWidthEnter' + that.options.breakPoints[i], [that.options.breakPoints[i], windowSize]);
                        
                        currentBreakPoint = that.options.breakPoints[i]
                        fired = true;
                    }
                    
                    i += 1;
                }
            };
        
        window.addEvent('resize', function () {
            clearTimeout(resizeDelay);
            resizeDelay = resizeFirer.delay(that.options.delay);
        });
    }