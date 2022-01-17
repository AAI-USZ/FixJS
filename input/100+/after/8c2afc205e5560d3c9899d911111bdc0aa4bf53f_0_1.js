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
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            this,
            function () {
                history.go(-1);
            });
        closeItem.setAnchorPoint(new cc.Point(0.5, 0.5));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        closeItem.setPosition(new cc.Point(size.width - 20, 20));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.ccp(size.width / 2, 0));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        var lazyLayer = new cc.LazyLayer();
        this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create("res/HelloWorld.png");
        this.sprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
        this.sprite.setScale(0.5);
        this.sprite.setRotation(180);

        lazyLayer.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));

        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, size.height - 60));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);

        this.helloLabel.runAction(cc.MoveBy.create(2.5, cc.ccp(0, size.height - 40)));

        this.setTouchEnabled(true);
        this.adjustSizeForWindow();
        lazyLayer.adjustSizeForCanvas();

        window.addEventListener("resize", function (event) {
            selfPointer.adjustSizeForWindow();
        });
        return true;
    }