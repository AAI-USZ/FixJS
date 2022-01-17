function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.sharedDirector().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            function () {
                history.go(-1);
            });
        pCloseItem.setAnchorPoint(new cc.Point(0.5,0.5));

        var pMenu = cc.Menu.menuWithItems(pCloseItem, null);
        pMenu.setPosition( cc.PointZero() );
        this.addChild(pMenu, 1);
        pCloseItem.setPosition(new cc.Point(size.width -20 , 20));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.labelWithString("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.ccp(size.width / 2, 0));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        var lazyLayer = new cc.LazyLayer();
        this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        this.pSprite = cc.Sprite.spriteWithFile("Resources/HelloWorld.png");
        this.pSprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
        this.pSprite.setScale(0.5);
        this.pSprite.setRotation(180);

        lazyLayer.addChild(this.pSprite, 0);

        var rotateToA = cc.RotateTo.actionWithDuration(2, 0);
        var scaleToA = cc.ScaleTo.actionWithDuration(2, 1, 1);

        this.pSprite.runAction(cc.Sequence.actions(rotateToA, scaleToA));

        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, size.height - 60));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);

        this.helloLabel.runAction(cc.MoveBy.actionWithDuration(2.5, cc.ccp(0, size.height - 40)));

        this.setIsTouchEnabled(true);
        this.adjustSizeForWindow();
        lazyLayer.adjustSizeForCanvas();

        window.addEventListener("resize", function (event) {
            selfPointer.adjustSizeForWindow();
        });
        return true;
    }