function (dt) {
        cc.Director.sharedDirector().getTouchDispatcher().setPriority(cc.CCMENU_HANDLER_PRIORITY + 1, this);
        this.unscheduleAllSelectors();
        cc.Log("Touches allowed again!");
    }