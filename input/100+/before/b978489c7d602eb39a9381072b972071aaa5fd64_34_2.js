function () {
        this._super();
        this.centerSprites(1);

        var animation = cc.Animation.create();
        var frameName = "";
        var format;
        for (var i = 1; i < 15; i++) {
            format = (i < 10) ? "0" + i : "" + i;
            frameName = "Resources/Images/grossini_dance_" + format + ".png";
            animation.addFrameWithFileName(frameName);
        }

        var action = cc.Animate.create(3, animation, false);
        var action_back = action.reverse();

        this._grossini.runAction(cc.Sequence.create(action, action_back, null));

    }