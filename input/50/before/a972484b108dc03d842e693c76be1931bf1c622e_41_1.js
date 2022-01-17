function (touch, event) {
        cc.Log("++++++++++++++++++++++++++++++++++++++++++++");
        this._beginPos = touch.getLocation();
        this._beginPos = cc.Director.getInstance().convertToGL(this._beginPos);
        return true;
    }