function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        var test = this._super();
        cc.LOG(test);
        if (!test) {
            return false;
        }

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.

        // add a "close" icon to exit the progress. it's an autorelease object
        var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            function () {
                alert("Bye Bye");
            });
        pCloseItem.setPosition(cc.canvas.width - 20, 20);
        var pMenu = cc.Menu.menuWithItems(pCloseItem, null);

        /*
         var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
         "CloseNormal.png",
         "CloseSelected.png",
         this,
         cc.menu_selector(Helloworld.menuCloseCallback) );
         pCloseItem.setPosition( cc.ccp(cc.Director.sharedDirector().getWinSize().width - 20, 20) );

         // create menu, it's an autorelease object
         var pMenu = cc.Menu.menuWithItems(pCloseItem, null);
         pMenu.setPosition( cc.PointZero() );
         this.addChild(pMenu, 1);
         */
        /////////////////////////////
        // 3. add your codes below...

        // add a label shows "Hello World"
        // create and initialize a label
        //var pLabel = cc.LabelTTF.labelWithString("Hello World", "Arial", 24);
        // ask director the window size
        var size = cc.Director.sharedDirector().getWinSize();

        // position the label on the center of the screen
        //pLabel.setPosition( cc.ccp(size.width / 2, size.height - 50) );

        // add the label as a child to this layer
        //this.addChild(pLabel, 1);

        // add "HelloWorld" splash screen"
        /*******************
         var pSprite = cc.Sprite.spriteWithFile("HelloWorld.png");

         // position the sprite on the center of the screen
         pSprite.setPosition( cc.ccp(size.width/2, size.height/2) );

         // add the sprite as a child to this layer
         this.addChild(pSprite, 0);
         *******************/
            //var helloSprite = cc.Sprite.spriteWithFile("helloworld.png");
            //this.addChild(helloSprite,0);

        this.helloLb = cc.LabelTTF.labelWithString("Hello World", "Arial", 24);
        this.helloLb.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, 0));
        this.addChild(this.helloLb, 5);

        this.pSprite = cc.Sprite.spriteWithFile("Resources/HelloWorld.png");
        this.pSprite.setPosition(cc.ccp(cc.Director.sharedDirector().getWinSize().width / 2, cc.Director.sharedDirector().getWinSize().height / 2));
        this.pSprite.setIsVisible(true);
        this.pSprite.setAnchorPoint(cc.ccp(0.5, 0.5));
        this.pSprite.setScale(0.5);
        //this.pSprite.setRotation(180);
        //this.pSprite.setFlipY(true);
        this.addChild(this.pSprite, 0);
        //this.pSprite.setColor(new cc.Color3B(255,128,128));

        var rotateToA = cc.RotateTo.actionWithDuration(2, 0);
        var scaleToA = cc.ScaleTo.actionWithDuration(2, 1, 1);
        //this.pSprite.setTexture(this.waveImageByCanvas(this.pSprite._m_originalTexture,50));
        this.pSprite.runAction(cc.Sequence.actions(rotateToA, scaleToA));
        //this.schedule(this.waveSprite,0.3);

        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40, 280));
        this.addChild(this.circle, 2);
        this.circle.schedule(this.circle.myUpdate, 1 / 60);

        this.helloLb.runAction(cc.MoveBy.actionWithDuration(2.5, cc.ccp(0, 280)));

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