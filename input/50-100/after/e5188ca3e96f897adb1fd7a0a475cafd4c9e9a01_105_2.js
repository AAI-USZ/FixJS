function(context, win)
    {
        if (context.cleanupSheetListener)
        {
            context.removeEventListener(win, "DOMAttrModified", context.cleanupSheetListener, false);
            context.removeEventListener(win, "DOMNodeInserted", context.cleanupSheetListener, false);
        }
    }