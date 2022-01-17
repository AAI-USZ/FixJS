function (message, buttons, callback, settings) {
    var args = { "eventId" : _eventId, "message" : message, "buttons" : buttons, "callback" : callback };
    if (settings) {
        args.settings = settings;
    }

    createEventHandler(callback);
    return window.webworks.execAsync(_ID, "customAskAsync", args);
}