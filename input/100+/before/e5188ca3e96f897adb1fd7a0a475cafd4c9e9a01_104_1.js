function(element)
    {
        var doc = element.ownerDocument;
        var win = doc.defaultView;

        // Update now if the document is loaded, otherwise wait for "load" event.
        if (doc.readyState == "complete")
            return this.doUpdateComputedView(element);

        if (this.updateInProgress)
            return;

        var self = this;
        var onWindowLoadHandler = function()
        {
            self.context.removeEventListener(win, "load", onWindowLoadHandler, true);
            self.updateInProgress = false;
            self.doUpdateComputedView(element);
        }

        this.context.addEventListener(win, "load", onWindowLoadHandler, true);
        this.updateInProgress = true;
    }