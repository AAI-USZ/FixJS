function () {
        cc.Director.sharedDirector().getTouchDispatcher().addTargetedDelegate(this, cc.CCMENU_TOUCH_PRIORITY, true);
    }