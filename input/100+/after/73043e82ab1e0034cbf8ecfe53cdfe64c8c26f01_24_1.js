function () {
        this._super();

        var winSize = cc.Director.sharedDirector().getWinSize();

        var label = cc.LabelTTF.create(this.title(), "Arial", 28);
        this.addChild(label, 1);
        label.setPosition(cc.ccp(winSize.width / 2, winSize.height - 50));

        var strSubtitle = this.subtitle();
        if (strSubtitle != "") {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 16);
            this.addChild(l, 1);
            l.setPosition(cc.ccp(winSize.width / 2, winSize.height - 80));
        }

        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.restartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var menu = cc.Menu.create(item1, item2, item3, null);

        menu.setPosition(cc.PointZero());
        item1.setPosition(cc.ccp(winSize.width / 2 - item2.getContentSize().width * 2, item2.getContentSize().height / 2));
        item2.setPosition(cc.ccp(winSize.width / 2, item2.getContentSize().height / 2));
        item3.setPosition(cc.ccp(winSize.width / 2 + item2.getContentSize().width * 2, item2.getContentSize().height / 2));

        this.addChild(menu, 1);
    }