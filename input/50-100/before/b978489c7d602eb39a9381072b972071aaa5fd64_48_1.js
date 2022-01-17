function (touch, event) {
        cc.Log("++++++++++++++++++++++++++++++++++++++++++++");
        this._beginPos = touch.locationInView(touch.view());
        this._beginPos = cc.Director.sharedDirector().convertToGL(this._beginPos);
        return true;
    }