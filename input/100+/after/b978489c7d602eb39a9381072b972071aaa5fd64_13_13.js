function () {
        this._super();
        var s = cc.Director.sharedDirector().getWinSize();
        var aspect = s.width / s.height;
        var x = 12 * aspect;
        var y = 12;
        var toff = cc.TurnOffTiles.create(cc.ccg(x, y), this._duration);
        var action = this.easeActionWithAction(toff);
        //TODO
        this._outScene.runAction(cc.Sequence.create(action, cc.CallFunc.create(this, this.finish), cc.StopGrid.create()));
    }