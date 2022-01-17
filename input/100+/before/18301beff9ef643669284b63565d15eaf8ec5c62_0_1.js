function () {
        this._super();
        this.centerSprites(1);

        var animation = cc.Animation.create();
        for (var i = 1; i < 15; i++) {
            var frameName = "Resources/Images/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFileName(frameName);
        }

        var action = cc.Animate.create(3, animation, false);
        var action_back = action.reverse();

        this._grossini.runAction(cc.Sequence.create(action, action_back ));

    }