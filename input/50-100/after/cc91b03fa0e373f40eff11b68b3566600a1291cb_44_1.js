function addListeners(win)
        {
            var doc = win.document;

            // xxxHonza: an iframe doesn't have to be loaded yet, so do not
            // register mutation elements in such cases since they wouldn't
            // be removed.
            // The listeners can be registered later in watchWindowDelayed,
            // but it's also risky. Mutation listeners should be registered
            // at the moment when it's clear that the window/frame has been
            // loaded.

            // This break HTML panel for about:blank pages (see issue 5120).
            //if (doc.location == "about:blank")
            //    return;

            Events.addEventListener(doc, "DOMAttrModified", self.onMutateAttr, false);
            Events.addEventListener(doc, "DOMCharacterDataModified", self.onMutateText, false);
            Events.addEventListener(doc, "DOMNodeInserted", self.onMutateNode, false);
            Events.addEventListener(doc, "DOMNodeRemoved", self.onMutateNode, false);
        }