function (watchId) {
        watchId = watchId | 0;

        if (_observers[watchId]) {
            event.deleteEventHandler("StateChange", _observers[watchId]);
            delete _observers[watchId];
        }
    }