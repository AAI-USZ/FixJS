function (time) {
        var frames = this._animation.getFrames();
        var numberOfFrames = frames.length;

        var idx = 0 | (time * numberOfFrames);

        if (idx >= numberOfFrames) {
            idx = numberOfFrames - 1;
        }

        var sprite = this._target;
        if (!sprite.isFrameDisplayed(frames[idx])) {
            sprite.setDisplayFrame(frames[idx]);
        }
    }