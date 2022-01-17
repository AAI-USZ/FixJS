function () {
        var s = cc.Director.sharedDirector().getWinSize();

        // parents
        var batch = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_grossiniPlist);

        var sprite1 = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.ccp(s.width / 3, s.height / 2));

        var sprite2 = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.ccp(50, 50));

        var sprite3 = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.ccp(-50, -50));

        batch.addChild(sprite1);
        sprite1.addChild(sprite2);
        sprite1.addChild(sprite3);

        // BEGIN NEW CODE
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 15; i++) {
            str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.createWithSpriteFrames(animFrames, 0.2);
        sprite1.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
        // END NEW CODE

        var action = cc.MoveBy.create(2, cc.ccp(200, 0));
        var action_back = action.reverse();
        var action_rot = cc.RotateBy.create(2, 360);
        var action_s = cc.ScaleBy.create(2, 2);
        var action_back = action_s.reverse();

        var seq2 = action_rot.reverse();
        sprite2.runAction(cc.RepeatForever.create(seq2));

        sprite1.runAction(cc.RepeatForever.create(action_rot));
        sprite1.runAction(cc.RepeatForever.create(cc.Sequence.create(action, action_back, null)));
        sprite1.runAction(cc.RepeatForever.create(cc.Sequence.create(action_s, action_back, null)));
    }