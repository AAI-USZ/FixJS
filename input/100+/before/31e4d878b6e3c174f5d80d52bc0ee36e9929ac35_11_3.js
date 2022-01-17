function () {
        // small capacity. Testing resizing.
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        var sprite1 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 0, 121 * 1, 85, 121));
        var sprite2 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 1, 121 * 1, 85, 121));
        var sprite3 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 2, 121 * 1, 85, 121));
        var sprite4 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 3, 121 * 1, 85, 121));

        var sprite5 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 0, 121 * 1, 85, 121));
        var sprite6 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 1, 121 * 1, 85, 121));
        var sprite7 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 2, 121 * 1, 85, 121));
        var sprite8 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 3, 121 * 1, 85, 121));


        var winSize = cc.Director.sharedDirector().getWinSize();
        sprite1.setPosition(cc.ccp((winSize.width / 5) * 1, (winSize.height / 3) * 1));
        sprite2.setPosition(cc.ccp((winSize.width / 5) * 2, (winSize.height / 3) * 1));
        sprite3.setPosition(cc.ccp((winSize.width / 5) * 3, (winSize.height / 3) * 1));
        sprite4.setPosition(cc.ccp((winSize.width / 5) * 4, (winSize.height / 3) * 1));
        sprite5.setPosition(cc.ccp((winSize.width / 5) * 1, (winSize.height / 3) * 2));
        sprite6.setPosition(cc.ccp((winSize.width / 5) * 2, (winSize.height / 3) * 2));
        sprite7.setPosition(cc.ccp((winSize.width / 5) * 3, (winSize.height / 3) * 2));
        sprite8.setPosition(cc.ccp((winSize.width / 5) * 4, (winSize.height / 3) * 2));

        var action = cc.FadeIn.create(2);
        var action_back = action.reverse();
        var fade = cc.RepeatForever.create(cc.Sequence.create(action, action_back, null));

        var tintRed = cc.TintBy.create(2, 0, -255, -255);
        var tintRedBack = tintRed.reverse();
        var red = cc.RepeatForever.create(cc.Sequence.create(tintRed, tintRedBack, null));

        var tintGreen = cc.TintBy.create(2, -255, 0, -255);
        var tintGreenBack = tintGreen.reverse();
        var green = cc.RepeatForever.create(cc.Sequence.create(tintGreen, tintGreenBack, null));

        var tintBlue = cc.TintBy.create(2, -255, -255, 0);
        var tintBlueBack = tintBlue.reverse();
        var blue = cc.RepeatForever.create(cc.Sequence.create(tintBlue, tintBlueBack, null));

        sprite5.runAction(red);
        sprite6.runAction(green);
        sprite7.runAction(blue);
        sprite8.runAction(fade);

        // late add: test dirtyColor and dirtyPosition
        batch.addChild(sprite1, 0, TAG_SPRITE1);
        batch.addChild(sprite2, 0, TAG_SPRITE2);
        batch.addChild(sprite3, 0, TAG_SPRITE3);
        batch.addChild(sprite4, 0, TAG_SPRITE4);
        batch.addChild(sprite5, 0, TAG_SPRITE5);
        batch.addChild(sprite6, 0, TAG_SPRITE6);
        batch.addChild(sprite7, 0, TAG_SPRITE7);
        batch.addChild(sprite8, 0, TAG_SPRITE8);

        this.schedule(this.removeAndAddSprite, 2);
    }