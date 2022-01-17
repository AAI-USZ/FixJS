function () {
        this._super();
  
        cc.MenuItemFont.setFontSize(24);
        var item1 = cc.MenuItemFont.create("Actions: Basic Tests", this, function() { require("javascript-spidermonkey/test-actions.js"); } );
        var item2 = cc.MenuItemFont.create("Actions: Ease Tests", this, function() { require("javascript-spidermonkey/test-easeactions.js"); } );
        var item3 = cc.MenuItemFont.create("Actions: Progress Tests", this, function() { require("javascript-spidermonkey/test-actionsprogress.js"); } );
        var item4 = cc.MenuItemFont.create("Chipmunk Tests", this, function() { require("javascript-spidermonkey/test-chipmunk.js"); } );
        var item5 = cc.MenuItemFont.create("Label Tests", this, function() { require("javascript-spidermonkey/test-label.js"); } );
        var item6 = cc.MenuItemFont.create("Menu Tests", this, function() { require("javascript-spidermonkey/test-menu.js"); } );
        var item7 = cc.MenuItemFont.create("Parallax Tests", this, function() { require("javascript-spidermonkey/test-parallax.js"); } );
        var item8 = cc.MenuItemFont.create("Particle Tests", this, function() { require("javascript-spidermonkey/test-particles.js"); } );
        var item9 = cc.MenuItemFont.create("RenderTexture Tests", this, function() { require("javascript-spidermonkey/test-rendertexture.js"); } );
        var item10 = cc.MenuItemFont.create("Sprite Tests", this, function() { require("javascript-spidermonkey/test-sprite.js"); } );
        var item11 = cc.MenuItemFont.create("Tilemap Tests", this, function() { require("javascript-spidermonkey/test-tilemap.js"); } );
        var item12 = cc.MenuItemFont.create("CocosDenshion Tests", this, function() { require("javascript-spidermonkey/test-cocosdenshion.js"); } );
        var item13 = cc.MenuItemFont.create("cocos2d presentation", this, function() { require("javascript-spidermonkey/test-cocos2djs.js"); } );


        this._menu = cc.Menu.create( item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13 );
        this._menu.alignItemsVertically();

        this._menu.setPosition( cc.p( winSize.width/2, winSize.height/2) );

        this.addChild( this._menu );

        var platform = __getPlatform();
        if( platform.substring(0,7) == 'desktop' )
            this.setMouseEnabled( true );
        else if( platform.substring(0,6) == 'mobile' )
            this.setTouchEnabled( true );
    }