function(context, win)
    {
        var doc = win.document;

        if (this.cleanupSheetListener)
        {
            context.removeEventListener(doc, "DOMAttrModified", this.cleanupSheetListener, false);
            context.removeEventListener(doc, "DOMNodeInserted", this.cleanupSheetListener, false);
        }
    }