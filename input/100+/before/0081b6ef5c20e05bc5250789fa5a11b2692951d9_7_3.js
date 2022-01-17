function () {
        this._super();

        this.centerSprites(3);

        var actionTo = cc.ScaleTo.create(2, 0.5);
        var actionBy = cc.ScaleBy.create(2, 2);
        var actionBy2 = cc.ScaleBy.create(2, 0.25, 4.5);
        var actionByBack = actionBy.reverse();
        var actionBy2Back = actionBy2.reverse();

        this._tamara.runAction(actionTo);
        this._kathia.runAction(cc.Sequence.create(actionBy2, actionBy2Back));
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack, null));

    }