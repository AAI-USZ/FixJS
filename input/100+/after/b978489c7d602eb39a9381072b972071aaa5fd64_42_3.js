function () {
        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);

        var title1 = cc.MenuItemFont.create("Sound");
        title1.setEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item1 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("On"),
            cc.MenuItemFont.create("Off"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title2 = cc.MenuItemFont.create("Music");
        title2.setEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item2 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("On"),
            cc.MenuItemFont.create("Off"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title3 = cc.MenuItemFont.create("Quality");
        title3.setEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item3 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("High"),
            cc.MenuItemFont.create("Low"));

        cc.MenuItemFont.setFontName("American Typewriter");
        cc.MenuItemFont.setFontSize(18);
        var title4 = cc.MenuItemFont.create("Orientation");
        title4.setEnabled(false);
        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);
        var item4 = cc.MenuItemToggle.create(this,
            this.menuCallback,
            cc.MenuItemFont.create("Off"));

        item4.getSubItems().push(cc.MenuItemFont.create("33%"));
        item4.getSubItems().push(cc.MenuItemFont.create("66%"));
        item4.getSubItems().push(cc.MenuItemFont.create("100%"));

        // you can change the one of the items by doing this
        item4.setSelectedIndex(2);

        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(34);

        var label = cc.LabelBMFont.create("go back", "Resources/fonts/bitmapFontTest3.fnt");
        var back = cc.MenuItemLabel.create(label, this, this.backCallback);

        var menu = cc.Menu.create(
            title1, title2,
            item1, item2,
            title3, title4,
            item3, item4,
            back); // 9 items.

        menu.alignItemsInColumns(2, 2, 2, 2, 1, null);

        this.addChild(menu);
    }