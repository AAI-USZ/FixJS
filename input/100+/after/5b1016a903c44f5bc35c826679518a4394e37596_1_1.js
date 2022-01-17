function(eventName, listener, prio, timeout) {
        persistRegistry.call(this);

        listener.$usetimeout = timeout === false
            ? 0
            : (typeof timeout == "number")
                ? timeout
                : exports.EventEmitter.DEFAULT_TIMEOUT;

        eventName = eventName.toLowerCase();
        prio      = prio || _ev.PRIO_NORMAL;
        var allListeners = getListeners.call(this, eventName),
            listeners    = this.$eventRegistry[prio][eventName];
        if (!listeners)
            listeners = this.$eventRegistry[prio][eventName] = [];
        if (allListeners.indexOf(listener) === -1)
            listeners.push(listener);
    }