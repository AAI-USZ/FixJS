function(context, win)
    {
        if (!context.cleanupSheetListener)
            context.cleanupSheetListener = Obj.bind(this.cleanupSheetHandler, this, context);

        context.addEventListener(win, "DOMAttrModified", context.cleanupSheetListener, false);
        context.addEventListener(win, "DOMNodeInserted", context.cleanupSheetListener, false);
    }