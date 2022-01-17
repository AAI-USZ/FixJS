function(origin, port)
    {
        // TODO make _registeredExtensions an array to allow multiple extensions/origin
        if (!this._registeredExtensions.hasOwnProperty(origin)) {
            if (origin !== window.location.origin) // Just ignore inspector frames.
                console.error("Ignoring unauthorized client request from " + origin);
            return;
        }
        InspectorBackend.registerExtensionDispatcher(this._notifyRemoteDebugEvent.bind(this));
        port._extensionOrigin = origin;
        port.addEventListener("message", this._onmessage.bind(this), false);
        port.start();
    }