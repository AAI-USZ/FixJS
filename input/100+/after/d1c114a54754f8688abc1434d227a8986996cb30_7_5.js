function () {
        this._super();
        var s = cc.Director.sharedDirector().getWinSize();

        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Bezier curve, make it (0,0)
        //

        this.centerSprites(3);

        // sprite 1
        var bezier = new cc.BezierConfig();
        bezier.controlPoint_1 = cc.PointMake(0, s.height / 2);
        bezier.controlPoint_2 = cc.PointMake(300, -s.height / 2);
        bezier.endPosition = cc.PointMake(300, 100);

        var bezierForward = cc.BezierBy.create(3, bezier);
        var rep = cc.RepeatForever.create(cc.Sequence.create(bezierForward, bezierForward.reverse()));

        // sprite 2
        this._tamara.setPosition(cc.PointMake(80, 160));
        var bezier2 = new cc.BezierConfig();
        bezier2.controlPoint_1 = cc.PointMake(100, s.height / 2);
        bezier2.controlPoint_2 = cc.PointMake(200, -s.height / 2);
        bezier2.endPosition = cc.PointMake(240, 160);

        var bezierTo1 = cc.BezierTo.create(2, bezier2);

        // sprite 3
        this._kathia.setPosition(cc.PointMake(400, 160));
        var bezierTo2 = cc.BezierTo.create(2, bezier2);

        this._grossini.runAction(rep);
        this._tamara.runAction(bezierTo1);
        this._kathia.runAction(bezierTo2);

    }