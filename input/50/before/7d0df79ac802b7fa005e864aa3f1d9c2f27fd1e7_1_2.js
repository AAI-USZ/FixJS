function (x, y) {
        this._body.SetPosition(new Box2D.Common.Math.b2Vec2(x / Settings.RATIO, y / Settings.RATIO));
        this._body.SetActive(true);
    }