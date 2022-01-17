function (texture) {
        var frameDict = null;
        for (var key in this._spriteFrames) {
            var frame = this._spriteFrames[key];
            if (frame && (frame.getTexture() == texture)) {
                delete(this._spriteFrames[key]);
            }
        }
    }