function (message, buttons, callback, settings) {
    var eventId = getUniqueEventId(),
        args = { "eventId" : eventId, "message" : message, "buttons" : buttons, "callback" : callback };
    if (settings) {
        args.settings = settings;
    }

    window.webworks.event.once(_ID, eventId, callback);
    return window.webworks.execAsync(_ID, "customAskAsync", args);
}