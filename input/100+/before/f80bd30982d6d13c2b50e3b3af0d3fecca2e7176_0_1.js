function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.Director.sharedDirector().getWinSize();

        //this.helloLb = cc.LabelTTF.create("Hello World", "Arial", 24);
        // position the label on the center of the screen
        //this.helloLb.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, 0));
        // add the label as a child to this layer
        //this.addChild(this.helloLb, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create("Resources/HelloWorld.png");
        this.sprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
        this.sprite.setVisible(true);
        this.sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.sprite.setScale(0.5);
        this.sprite.setRotation(180);
        this.addChild(this.sprite, 0);


        var actionTo = cc.SkewTo.create(5, 0., 45);
        var actionToBack = cc.SkewTo.create(5, 0, 0);
        var rotateTo = cc.RotateTo.create(5, 300.0);
        var rotateToBack = cc.RotateTo.create(5, 0);
        var actionScaleTo = cc.ScaleTo.create(5, -0.44, 0.47);
        var actionScaleToBack = cc.ScaleTo.create(5, 1.0, 1.0);
        var actionBy = cc.MoveBy.create(5, cc.PointMake(80, 80));
        var actionByBack = actionBy.reverse();

        //this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));


        this.sprite.runAction(cc.Sequence.create(actionTo, actionToBack, null));
        this.sprite.runAction(cc.Sequence.create(rotateTo, rotateToBack, null));
        this.sprite.runAction(cc.Sequence.create(actionScaleTo, actionScaleToBack));
        this.sprite.runAction(cc.Sequence.create(actionBy, actionByBack));

/*        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, 280));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);*/

        //this.helloLb.runAction(cc.MoveBy.create(2.5, cc.ccp(0, 280)));

        this.setIsTouchEnabled(true);



        var closeItem = cc.MenuItemImage.create(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            this.menuCloseCallback);
        var text = cc.MenuItemFont.create("Hello Dom",this, function(){});
        text.setColor({r:255,g:0,b:0});
        text.setPosition(cc.ccp(cc.canvas.width/2,cc.canvas.height/2));
        closeItem.setPosition(cc.ccp(cc.canvas.width - 20, 20));
        var menu = cc.Menu.create(closeItem, text);
        menu.setPosition(cc.ccp(0, 0));
        this.sprite.addChild(menu);
        //cc.fullscreen();
        return true;
    }