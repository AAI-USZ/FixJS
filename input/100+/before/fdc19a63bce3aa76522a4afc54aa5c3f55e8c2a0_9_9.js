function () {
        this._super();
        this._inScene.setIsVisible(false);

        var split = this.action();
        //TODO
        var seq = cc.Sequence.create
            (
                split,
                cc.CallFunc.create(this, this.hideOutShowIn),
                split.reverse(),
                null
            );

        this.runAction
            (
                cc.Sequence.create
                    (
                        this.easeActionWithAction(seq),
                        cc.CallFunc.create(this, this.finish),
                        cc.StopGrid.create(),
                        null
                    )
            );
    }