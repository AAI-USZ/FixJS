function(parentFrame, frameTreePayload)
    {
        var framePayload = frameTreePayload.frame;
        var frame = new WebInspector.ResourceTreeFrame(this, parentFrame, framePayload);
        this._addFrame(frame);

        var frameResource = this._createResourceFromFramePayload(framePayload, framePayload.url, WebInspector.resourceTypes.Document, framePayload.mimeType);
        if (frame.isMainFrame())
            WebInspector.inspectedPageURL = frameResource.url;
        frame.addResource(frameResource);

        for (var i = 0; frameTreePayload.childFrames && i < frameTreePayload.childFrames.length; ++i)
            this._addFramesRecursively(frame, frameTreePayload.childFrames[i]);

        for (var i = 0; i < frameTreePayload.resources.length; ++i) {
            var subresource = frameTreePayload.resources[i];
            var resource = this._createResourceFromFramePayload(framePayload, subresource.url, WebInspector.resourceTypes[subresource.type], subresource.mimeType);
            frame.addResource(resource);
        }
    }