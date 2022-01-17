function (message, type, callback, settings) {
    var  args = { "eventId" : _eventId, "message" : message, "type" : type, "callback" : callback };
    if (settings) {
        args.settings = settings;
    }

    createEventHandler(callback);
    return window.webworks.execAsync(_ID, "standardAskAsync", args);
}