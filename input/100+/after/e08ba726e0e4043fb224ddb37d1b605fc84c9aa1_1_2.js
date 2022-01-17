function (SelectedIndex) {
        if (SelectedIndex != this._selectedIndex) {
            this._selectedIndex = SelectedIndex;
            var currItem = this.getChildByTag(cc.CURRENT_ITEM);
            if(currItem){
                currItem.removeFromParentAndCleanup(false);
            }

            var item = this._subItems[this._selectedIndex];
            this.addChild(item, 0, cc.CURRENT_ITEM);
            var s = item.getContentSize();
            this.setContentSize(s);
            item.setPosition(cc.ccp(s.width / 2, s.height / 2));
        }
    }