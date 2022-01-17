function (dt) {
        cc.TouchDispatcher.sharedDispatcher().setPriority(cc.CCMENU_TOUCH_PRIORITY + 1, this);
        this.unscheduleAllSelectors();
        cc.Log("Touches allowed again!");
    }