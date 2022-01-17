function (sender) {
        // hijack all touch events for 5 seconds
        cc.TouchDispatcher.sharedDispatcher().setPriority(cc.CCMENU_TOUCH_PRIORITY - 1, this);
        this.schedule(this.allowTouches, 5.0);
        cc.Log("TOUCHES DISABLED FOR 5 SECONDS");
    }