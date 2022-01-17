function(origin, port)
    {
        if (!this._registeredExtensions.hasOwnProperty(origin)) {
            if (origin !== window.location.origin) // Just ignore inspector frames.
                console.error("Ignoring unauthorized client request from " + origin);
            return;
        }
        port._extensionOrigin = origin;
        port.addEventListener("message", this._onmessage.bind(this), false);
        port.start();
    }