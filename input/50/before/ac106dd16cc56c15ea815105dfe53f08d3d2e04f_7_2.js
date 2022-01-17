function (dt) {
        cc.Director.sharedDirector().getTouchDispatcher().setPriority(cc.CCMENU_TOUCH_PRIORITY + 1, this);
        this.unscheduleAllSelectors();
        cc.Log("Touches allowed again!");
    }