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
        
        WebInspector.RemoteObject.resolveNode(this.representedObject, "", scrollIntoViewCallback);
    }