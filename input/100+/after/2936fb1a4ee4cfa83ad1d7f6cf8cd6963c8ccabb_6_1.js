function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            function () {
                alert("Bye Bye");
            });
        closeItem.setPosition(cc.canvas.width - 20, 20);
        var menu = cc.Menu.create(closeItem, null);

        /*
         var closeItem = cc.MenuItemImage.create(
         "CloseNormal.png",
         "CloseSelected.png",
         this,
         cc.menu_selector(Helloworld.menuCloseCallback) );
         closeItem.setPosition( cc.ccp(cc.Director.sharedDirector().getWinSize().width - 20, 20) );

         // create menu, it's an autorelease object
         var menu = cc.Menu.create(closeItem, null);
         menu.setPosition( cc.PointZero() );
         this.addChild(menu, 1);
         */
        /////////////////////////////
        // 3. add your codes below...

        // add a label shows "Hello World"
        // create and initialize a label
        //var pLabel = cc.LabelTTF.create("Hello World", "Arial", 24);
        // ask director the window size
        var size = cc.Director.sharedDirector().getWinSize();

        // position the label on the center of the screen
        //pLabel.setPosition( cc.ccp(size.width / 2, size.height - 50) );

        // add the label as a child to this layer
        //this.addChild(pLabel, 1);

        // add "HelloWorld" splash screen"
        /*******************
         var sprite = cc.Sprite.create("HelloWorld.png");

         // position the sprite on the center of the screen
         sprite.setPosition( cc.ccp(size.width/2, size.height/2) );

         // add the sprite as a child to this layer
         this.addChild(sprite, 0);
         *******************/
            //var helloSprite = cc.Sprite.create("helloworld.png");
            //this.addChild(helloSprite,0);

        this.helloLb = cc.LabelTTF.create("Hello World", "Arial", 24);
        this.helloLb.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, 0));
        this.addChild(this.helloLb, 5);

        this.sprite = cc.Sprite.create("Resources/HelloWorld.png");
        this.sprite.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, cc.Director.sharedDirector().getWinSize().height / 2));
        this.sprite.setVisible(true);
        this.sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.sprite.setScale(0.5);
        //this.sprite.setRotation(180);
        //this.sprite.setFlipY(true);
        this.addChild(this.sprite, 0);
        //this.sprite.setColor(new cc.Color3B(255,128,128));

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);
        //this.sprite.setTexture(this.waveImageByCanvas(this.sprite._originalTexture,50));
        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        //this.schedule(this.waveSprite,0.3);

        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, 280));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);

        this.helloLb.runAction(cc.MoveBy.create(2.5, cc.ccp(0, 280)));

        this.setIsTouchEnabled(true);
        //this.adjustSizeForWindow();

        window.addEventListener("resize", function (event) {
            //selfPointer.adjustSizeForWindow();
        });

        var listener = document.getElementById('listener');
        listener.addEventListener('message', handleMessage, true);
        pageDidLoad();
        moduleDidLoad();

        naclCmdProcess(asyncCmd, "I am cocos2d.");
        //var testValue = naclCmdProcess(syncCmd, "I am cocos2d.");
        //alert(testValue);

        return true;
    }