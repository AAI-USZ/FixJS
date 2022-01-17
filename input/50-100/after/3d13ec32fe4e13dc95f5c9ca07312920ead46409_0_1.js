function()
    {
        function scrollIntoViewCallback(object)
        {
            function scrollIntoView()
            {
                this.scrollIntoViewIfNeeded(true);
            }

            if (object)
                object.callFunction(scrollIntoView);
        }
        
        var node = /** @type {WebInspector.DOMNode} */ this.representedObject;
        WebInspector.RemoteObject.resolveNode(node, "", scrollIntoViewCallback);
    }