function (watchId) {
        watchId = String(watchId);

        if (_observers[watchId]) {
            event.deleteEventHandler("StateChange", _observers[watchId]);
            delete _observers[watchId];
        }
    }