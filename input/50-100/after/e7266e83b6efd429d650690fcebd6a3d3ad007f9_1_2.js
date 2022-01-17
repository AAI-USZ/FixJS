function () {
        var message = "hello world",
            type = 0,
            callback,
            settings = {};
            
        client.standardAskAsync(message, type, callback, settings);
        expect(mockedWebworks.event.once).toHaveBeenCalledWith("blackberry.ui.dialog", "blackberry.ui.dialogEventId", callback);
        expect(mockedWebworks.execAsync).toHaveBeenCalledWith("blackberry.ui.dialog", "standardAskAsync", { "eventId" : "blackberry.ui.dialogEventId", "message" : message, "type" : type, "callback" : callback, "settings" : settings });
    }