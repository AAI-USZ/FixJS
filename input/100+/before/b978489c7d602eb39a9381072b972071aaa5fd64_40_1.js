function () {
        var s = cc.Director.sharedDirector().getWinSize();

        var layer = cc.LayerColor.create(cc.ccc4(128, 128, 128, 255));
        this.addChild(layer, -10);

        // cc.LabelBMFont
        var label1 = cc.LabelTTF.create("Testing A8 Format", "Marker Felt", 48);
        this.addChild(label1);
        label1.setColor(cc.RED());
        label1.setPosition(cc.ccp(s.width / 2, s.height / 2));

        var fadeOut = cc.FadeOut.create(2);
        var fadeIn = cc.FadeIn.create(2);
        var seq = cc.Sequence.create(fadeOut, fadeIn);
        var forever = cc.RepeatForever.create(seq);
        label1.runAction(forever);
    }