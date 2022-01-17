function () {
        this._super();
        this._inScene.setVisible(false);

        var split = this.action();
        //TODO
        var seq = cc.Sequence.create(
                split,
                cc.CallFunc.create(this, this.hideOutShowIn),
                split.reverse());

        this.runAction(
                cc.Sequence.create(
                        this.easeActionWithAction(seq),
                        cc.CallFunc.create(this, this.finish),
                        cc.StopGrid.create()
                ));
    }