function () {
        var ret = false;

        if (this._super()) {
            this.setTouchEnabled(true);
            var s = cc.Director.sharedDirector().getWinSize();
            var item = cc.MenuItemFont.create("Rotate Device", this, this.rotateDevice);
            var menu = cc.Menu.create(item, null);
            menu.setPosition(cc.ccp(s.width / 2, s.height / 2));
            this.addChild(menu);

            ret = true;
        }

        return ret;
    }