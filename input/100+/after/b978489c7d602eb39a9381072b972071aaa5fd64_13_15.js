function () {
        this._super();

        var s = cc.Director.sharedDirector().getWinSize();
        var aspect = s.width / s.height;
        var x = (12 * aspect);
        var y = 12;

        var action = this.actionWithSize(cc.ccg(x, y));

        this._outScene.runAction(
                cc.Sequence.create(
                        this.easeActionWithAction(action),
                        cc.CallFunc.create(this, this.finish),
                        cc.StopGrid.create())
            );
    }