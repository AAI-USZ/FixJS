function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.SkewTo.create(2, 37.2, -37.2);
        var actionToBack = cc.SkewTo.create(2, 0, 0);
        var actionBy = cc.SkewBy.create(2, 0, -90);
        var actionBy2 = cc.SkewBy.create(2, 45.0, 45.0);
        var actionByBack = actionBy.reverse();
        var actionBy2Back = actionBy2.reverse();


        this._tamara.runAction(cc.Sequence.create(actionTo, actionToBack, null));
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack, null));

        this._kathia.runAction(cc.Sequence.create(actionBy2, actionBy2Back, null));


    }