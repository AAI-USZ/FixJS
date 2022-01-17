function () {
        this._super();
        this._grossini = cc.Sprite.create(s_pathGrossini);
        this._tamara = cc.Sprite.create(s_pathSister1);
        this._kathia = cc.Sprite.create(s_pathSister2);
        this.addChild(this._grossini, 1);
        this.addChild(this._tamara, 2);
        this.addChild(this._kathia, 3);
        var s = cc.Director.sharedDirector().getWinSize();
        this._grossini.setPosition(cc.PointMake(s.width / 2, s.height / 3));
        this._tamara.setPosition(cc.PointMake(s.width / 2, 2 * s.height / 3));
        this._kathia.setPosition(cc.PointMake(s.width / 2, s.height / 2));

        // add title and subtitle
        var title = this.title();
        var label = cc.LabelTTF.create(title, "Arial", 18);
        this.addChild(label, 1);
        label.setPosition(cc.PointMake(s.width / 2, s.height - 30));

        var strSubtitle = this.subtitle();
        if (strSubtitle) {
            var l = cc.LabelTTF.create(strSubtitle, "Thonburi", 22);
            this.addChild(l, 1);
            l.setPosition(cc.PointMake(s.width / 2, s.height - 60));
        }

        // add menu
        var item1 = cc.MenuItemImage.create(s_pathB1, s_pathB2, this, this.backCallback);
        var item2 = cc.MenuItemImage.create(s_pathR1, s_pathR2, this, this.restartCallback);
        var item3 = cc.MenuItemImage.create(s_pathF1, s_pathF2, this, this.nextCallback);

        var menu = cc.Menu.create(item1, item2, item3, null);

        menu.setPosition(cc.PointZero());
        item1.setPosition(cc.PointMake(s.width / 2 - item2.getContentSize().width * 2, item2.getContentSize().height / 2));
        item2.setPosition(cc.PointMake(s.width / 2, item2.getContentSize().height / 2));
        item3.setPosition(cc.PointMake(s.width / 2 + item2.getContentSize().width * 2, item2.getContentSize().height / 2));

        this.addChild(menu, 1);
    }