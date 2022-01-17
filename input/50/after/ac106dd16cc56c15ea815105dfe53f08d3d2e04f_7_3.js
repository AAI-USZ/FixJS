function (sender) {
        // hijack all touch events for 5 seconds
        cc.Director.sharedDirector().getTouchDispatcher().setPriority(cc.CCMENU_HANDLER_PRIORITY - 1, this);
        this.schedule(this.allowTouches, 5.0);
        cc.Log("TOUCHES DISABLED FOR 5 SECONDS");
    }