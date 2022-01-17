function (texture, rect) {
        var pFrame = cc.SpriteFrame.create(texture, rect);
        this._frames.push(pFrame);
    }