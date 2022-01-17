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

        // coin only needed to obtain the texture for the Batch Node
        var coin = cc.Sprite.createWithSpriteFrameName("coin01.png");
        this._batch = cc.SpriteBatchNode.createWithTexture( coin.getTexture(), 100 );
        this.addChild( this._batch );
    }