function (dt) {
        cc.Director.getInstance().getTouchDispatcher().setPriority(cc.MENU_HANDLER_PRIORITY + 1, this);
        this.unscheduleAllSelectors();
        cc.Log("Touches allowed again!");
    }