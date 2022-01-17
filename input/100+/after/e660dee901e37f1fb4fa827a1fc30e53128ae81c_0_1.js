function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.Director.sharedDirector().getWinSize();

        //this.helloLb = cc.LabelTTF.labelWithString("Hello World", "Arial", 24);
        // position the label on the center of the screen
        //this.helloLb.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, 0));
        // add the label as a child to this layer
        //this.addChild(this.helloLb, 5);

        // add "HelloWorld" splash screen"
        this.pSprite = cc.Sprite.spriteWithFile("Resources/HelloWorld.png");
        this.pSprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
        this.pSprite.setIsVisible(true);
        this.pSprite.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.pSprite.setScale(0.5);
        this.pSprite.setRotation(180);
        this.addChild(this.pSprite, 0);


        var actionTo = cc.SkewTo.actionWithDuration(5, 0., 45);
        var actionToBack = cc.SkewTo.actionWithDuration(5, 0, 0);
        var rotateTo = cc.RotateTo.actionWithDuration(5, 300.0);
        var rotateToBack = cc.RotateTo.actionWithDuration(5, 0);
        var actionScaleTo = cc.ScaleTo.actionWithDuration(5, -0.44, 0.47);
        var actionScaleToBack = cc.ScaleTo.actionWithDuration(5, 1.0, 1.0);
        var actionBy = cc.MoveBy.actionWithDuration(5, cc.PointMake(80, 80));
        var actionByBack = actionBy.reverse();

        //this.pSprite.runAction(cc.Sequence.actions(rotateToA, scaleToA));


        this.pSprite.runAction(cc.Sequence.actions(actionTo, actionToBack, null));
        this.pSprite.runAction(cc.Sequence.actions(rotateTo, rotateToBack, null));
        this.pSprite.runAction(cc.Sequence.actions(actionScaleTo, actionScaleToBack));
        this.pSprite.runAction(cc.Sequence.actions(actionBy, actionByBack));

/*        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, 280));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);*/

        //this.helloLb.runAction(cc.MoveBy.actionWithDuration(2.5, cc.ccp(0, 280)));

        this.setIsTouchEnabled(true);



        var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            this.menuCloseCallback);
        var text = cc.MenuItemFont.itemFromString("Hello Dom",this, function(){});
        text.setColor({r:255,g:0,b:0});
        text.setPosition(cc.ccp(cc.canvas.width/2,cc.canvas.height/2));
        pCloseItem.setPosition(cc.canvas.width - 20, 20);
        var pMenu = cc.Menu.menuWithItems(pCloseItem, text);
        this.pSprite.addChild(pMenu);
        //cc.fullscreen();
        return true;
    }