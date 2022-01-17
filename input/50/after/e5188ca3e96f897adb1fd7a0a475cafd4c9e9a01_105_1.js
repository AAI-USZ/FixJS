function(event, context)
    {
        var target = event.target;
        var tagName = (target.tagName || "").toLowerCase();

        if (tagName == "link")
            this.cleanupSheets(target.ownerDocument, context);
    }