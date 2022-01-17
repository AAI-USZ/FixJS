function(f) {
        if (handler && typeof handler === 'function') {
            try { signal.disconnect(handler) } catch (e) {}
        }

        handler = f;

        if (typeof f === 'function') {
            signal.connect(f);
        }
    }