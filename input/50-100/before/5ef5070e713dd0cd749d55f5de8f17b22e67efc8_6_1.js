function () {
                loops = 0;
                this.curTime = Date.now();
                if (this.curTime - nextGameTick > 60 * milliSecPerFrame) {
                    nextGameTick = this.curTime - milliSecPerFrame;
                }
                while (this.curTime > nextGameTick) {
                    Crafty.trigger("EnterFrame", { frame: frame++ });
                    nextGameTick += milliSecPerFrame;
                    loops++;
                }
                if (loops) {
                    Crafty.DrawManager.draw();
                }
            }