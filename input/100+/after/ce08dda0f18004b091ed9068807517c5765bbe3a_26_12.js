function () {
        this._super();

        var l = cc.LayerColor.create(this._color);
        this._inScene.setVisible(false);

        this.addChild(l, 2, cc.SCENE_FADE);
        var f = this.getChildByTag(cc.SCENE_FADE);

        //TODO
        var a = cc.Sequence.create(
                cc.FadeIn.create(this._duration / 2),
                cc.CallFunc.create(this, this.hideOutShowIn), //CCCallFunc.actionWithTarget:self selector:@selector(hideOutShowIn)],
                cc.FadeOut.create(this._duration / 2),
                cc.CallFunc.create(this, this.finish) //:self selector:@selector(finish)],
            );
        f.runAction(a);
    }