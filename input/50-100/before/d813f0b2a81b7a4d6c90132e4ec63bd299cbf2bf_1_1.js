function () {
                
 
                var onFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                null,
            self=this;
        
                if (onFrame) {
                    tick = function () {
                       self.step();
                        requestID = onFrame(tick);
                    //console.log(requestID + ', ' + frame)
                    }

                    tick();
                } else {
                    tick = setInterval(self.step, 1000 / FPS);
                }
            }