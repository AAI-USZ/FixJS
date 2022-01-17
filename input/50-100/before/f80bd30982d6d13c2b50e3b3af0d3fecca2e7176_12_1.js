function () {
        var layer1 = cc.LayerGradient.create(cc.ccc4(255, 0, 0, 255), cc.ccc4(0, 255, 0, 255), cc.ccp(0.9, 0.9));
        this.addChild(layer1, 0, cc.TAG_LAYER);

        this.setIsTouchEnabled(true);

        /*var label1 = cc.LabelTTF.create("Compressed Interpolation: Enabled", "Marker Felt", 26);
         var label2 = cc.LabelTTF.create("Compressed Interpolation: Disabled", "Marker Felt", 26);
         var item1 = cc.MenuItemLabel.create(label1);
         var item2 = cc.MenuItemLabel.create(label2);
         var item = cc.MenuItemToggle.create(this, this.toggleItem, item1, item2, null);

         var menu = cc.Menu.create(item, null);
         this.addChild(menu);
         var s = cc.Director.sharedDirector().getWinSize();
         menu.setPosition(cc.ccp(s.width / 2, 100));*/
    }