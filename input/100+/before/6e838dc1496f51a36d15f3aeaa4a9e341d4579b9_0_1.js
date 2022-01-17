function () {
                                
        var parent = new cc.LayerGradient();
        __associateObjWithNative(this, parent);
        this.init(cc.c4(0, 0, 0, 255), cc.c4(255, 255, 255, 255));

        this.scheduleUpdate();

        var platform = __getPlatform();
        if( platform.substring(0,7) == 'desktop' ) {
            this.setMouseEnabled( true );
        } else if( platform.substring(0,6) == 'mobile' ) {
            this.setTouchEnabled( true );
        }


        cc.MenuItemFont.setFontSize(16);
        var menuItem = cc.MenuItemFont.create("Reset", this, this.reset );
        var menu = cc.Menu.create( menuItem );
        this.addChild( menu );
        menu.setPosition( cc._p( 40,60)  );
    
        var animCache = cc.AnimationCache.getInstance();
        animCache.addAnimationsWithFile("coins_animation.plist");
        var animation = animCache.animationByName("coin");


        var coin = cc.Sprite.createWithSpriteFrameName("coin01.png");
        var batch = cc.SpriteBatchNode.createWithTexture( coin.getTexture(), 20 );
        this.addChild( batch );

        var action = cc.RepeatForever.create( cc.Animate.create( animation ) );

        for( var i = 1; i < 21; i++ ) {
            var frameName = "coin" + ((i < 10) ? ("0" + i) : i) + ".png";
            var coin = cc.Sprite.createWithSpriteFrameName( frameName );
            coin.runAction( action.copy() );
            coin.setPosition( cc._p( 0 + i * _winSize[0]/21, _winSize[1]/2) );
            batch.addChild( coin );
        }
    }