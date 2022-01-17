function () {
                
                this.curTime = Date.now();
                if (this.curTime > nextGameTick) {
                    
                      Crafty.trigger("EnterFrame", {
                        frame: frame++
                    });
                   
                    Crafty.DrawManager.draw();
                    nextGameTick = this.curTime +minimumDelay;
                }
            }