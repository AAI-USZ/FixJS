function (priority, delegate) {
        cc.Assert(delegate != null, "TouchDispatcher.setPriority():Arguments is null");

        var handler = this.findHandler(delegate);

        cc.Assert(handler != null, "TouchDispatcher.setPriority():Cant find TouchHandler");

        handler.setPriority(priority);

        this.rearrangeHandlers(this._targetedHandlers);
        this.rearrangeHandlers(this._standardHandlers);
    }