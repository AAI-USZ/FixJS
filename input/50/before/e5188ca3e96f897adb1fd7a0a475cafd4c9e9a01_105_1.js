function(event, context)
    {
        var target = event.target,
            tagName = (target.tagName || "").toLowerCase();

        if (tagName == "link")
        {
            this.cleanupSheets(target.ownerDocument, context);
        }
    }