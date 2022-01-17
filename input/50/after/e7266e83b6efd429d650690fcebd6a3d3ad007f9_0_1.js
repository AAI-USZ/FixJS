function createEventHandler(callback) {
    if (!window.webworks.event.isOn(_eventId)) {
        window.webworks.event.once(_ID, _eventId, callback);
    }
}