function(context, win)
    {
        var doc = win.document;
        this.cleanupSheetListener= Obj.bind(this.cleanupSheetHandler, this, context);

        context.addEventListener(doc, "DOMAttrModified", this.cleanupSheetListener, false);
        context.addEventListener(doc, "DOMNodeInserted", this.cleanupSheetListener, false);
    }