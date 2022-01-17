function () {
        // Initialize instance and cocos2d.
        if (!this.applicationDidFinishLaunching()) {
            return 0;
        }
        // TODO, need to be fixed.
        if (window.requestAnimFrame) {
            var callback = function () {
                cc.Director.getInstance().mainLoop();
                window.requestAnimFrame(callback);
            };
            cc.Log(window.requestAnimFrame);
            window.requestAnimFrame(callback);
        }
        else {
            var callback = function () {
                cc.Director.getInstance().mainLoop();
            };
            setInterval(callback, this._animationInterval * 1000);
        }

    }