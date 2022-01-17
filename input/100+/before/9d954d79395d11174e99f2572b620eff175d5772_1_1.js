function(parentFrame, frameTreePayload)
    {
        var framePayload = frameTreePayload.frame;
        var frame = new WebInspector.ResourceTreeFrame(this, parentFrame, framePayload);

        // Create frame resource.
        var frameResource = this._createResourceFromFramePayload(framePayload, framePayload.url, WebInspector.resourceTypes.Document, framePayload.mimeType);

        if (frame.isMainFrame())
            WebInspector.inspectedPageURL = frameResource.url;

        this._addFrame(frame);
        frame.addResource(frameResource);

        for (var i = 0; frameTreePayload.childFrames && i < frameTreePayload.childFrames.length; ++i)
            this._addFramesRecursively(frame, frameTreePayload.childFrames[i]);

        if (!frameTreePayload.resources)
            return;

        // Create frame subresources.
        for (var i = 0; i < frameTreePayload.resources.length; ++i) {
            var subresource = frameTreePayload.resources[i];
            var resource = this._createResourceFromFramePayload(framePayload, subresource.url, WebInspector.resourceTypes[subresource.type], subresource.mimeType);
            frame.addResource(resource);
        }
    }