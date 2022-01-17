function () {
        this._super();
        var s = cc.Director.sharedDirector().getWinSize();
        var x, y;
        if (s.width > s.height) {
            x = 16;
            y = 12;
        } else {
            x = 12;
            y = 16;
        }

        var action = this.actionWithSize(cc.ccg(x, y));

        if (!this._back) {
            this._outScene.runAction(cc.Sequence.create(action,
                cc.CallFunc.create(this, cc.TransitionScene.finish),
                cc.StopGrid.create()));
        } else {
            // to prevent initial flicker
            this._inScene.setVisible(false);
            this._inScene.runAction(cc.Sequence.create(cc.Show.create(),
                action,
                cc.CallFunc.create(this, cc.TransitionScene.finish),
                cc.StopGrid.create()));
        }
    }