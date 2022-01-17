function () {
        this._super();
        this.centerSprites(1);

        var animation = cc.Animation.create();
        animation.setDelayPerUnit( 0.3 );
        for (var i = 1; i < 15; i++) {
            var frameName = "grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFilename(frameName);
        }

        var action = cc.Animate.create( animation );
        var action_back = action.reverse();

        this._grossini.runAction(cc.Sequence.create(action, action_back ));

    }