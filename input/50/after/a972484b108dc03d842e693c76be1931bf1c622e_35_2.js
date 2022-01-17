function (sender) {
        // hijack all touch events for 5 seconds
        cc.Director.getInstance().getTouchDispatcher().setPriority(cc.MENU_HANDLER_PRIORITY - 1, this);
        this.schedule(this.allowTouches, 5.0);
        cc.log("TOUCHES DISABLED FOR 5 SECONDS");
    }