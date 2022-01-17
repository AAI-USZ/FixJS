function () {
        this._super();
        //this.init();
        var x, y;
        var size = cc.Director.sharedDirector().getWinSize();
        x = size.width;
        y = size.height;

        var bg1 = cc.Sprite.create(s_back2);
        bg1.setPosition(cc.PointMake(size.width / 2, size.height / 2));
        bg1.setScale(1.7);
        this.addChild(bg1, -1);

        var title = cc.LabelTTF.create(TransitionsTests[transitionsIdx].title, "Thonburi", 32);
        this.addChild(title);
        title.setColor(cc.ccc3(255, 32, 32));
        title.setPosition(cc.PointMake(x / 2, y - 100));

        var label = cc.LabelTTF.create("SCENE 2", "Marker Felt", 38);
        label.setColor(cc.ccc3(16, 16, 255));
        label.setPosition(cc.PointMake(x / 2, y / 2));
        this.addChild(label);

        // menu
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.restartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var menu = cc.Menu.create(item1, item2, item3, null);

        menu.setPosition(cc.PointZero());
        item1.setPosition(cc.PointMake(x / 2 - 100, 30));
        item2.setPosition(cc.PointMake(x / 2, 30));
        item3.setPosition(cc.PointMake(x / 2 + 100, 30));

        this.addChild(menu, 1);

        this.schedule(this.step, 1.0);
    }