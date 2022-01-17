function (message, type, callback, settings) {
    var eventId = getUniqueEventId(),
        args = { "eventId" : eventId, "message" : message, "type" : type, "callback" : callback };
    if (settings) {
        args.settings = settings;
    }

    window.webworks.event.once(_ID, eventId, callback);
    return window.webworks.execAsync(_ID, "standardAskAsync", args);
}