function (touch, event) {
        cc.Log("++++++++++++++++++++++++++++++++++++++++++++");
        this._beginPos = touch.locationInView();
        this._beginPos = cc.Director.sharedDirector().convertToGL(this._beginPos);
        return true;
    }