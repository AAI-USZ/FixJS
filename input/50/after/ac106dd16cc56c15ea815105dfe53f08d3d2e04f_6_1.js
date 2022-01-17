function () {
        cc.Director.sharedDirector().getTouchDispatcher().addTargetedDelegate(this, cc.CCMENU_HANDLER_PRIORITY + 1, true);
    }