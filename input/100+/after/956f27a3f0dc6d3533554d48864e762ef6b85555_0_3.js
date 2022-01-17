function (time) {
        // if t==1, ignore. Animation should finish with t==1
        if (time < 1.0) {
            time *= this._animation.getLoops();

            // new loop?  If so, reset frame counter
            var loopNumber = 0 | time;
            if (loopNumber > this._executedLoops) {
                this._nextFrame = 0;
                this._executedLoops++;
            }

            // new t for animations
            time = time % 1.0;
        }

        var frames = this._animation.getFrames();
        var numberOfFrames = frames.length;
        var frameToDisplay = null;

        for (var i = this._nextFrame; i < numberOfFrames; i++) {
            var splitTime = this._splitTimes[i];

            if (splitTime <= time) {
                var frame = frames[i];
                frameToDisplay = frame.getSpriteFrame();
                this._target.setDisplayFrame(frameToDisplay);

                var dict = frame.getUserInfo();
                if (dict) {
                    //TODO: [[NSNotificationCenter defaultCenter] postNotificationName:CCAnimationFrameDisplayedNotification object:target_ userInfo:dict];
                }
                this._nextFrame = i + 1;
                break;
            }
        }
    }