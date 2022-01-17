function () {
        var message = "hello world",
            type = 0,
            callback,
            settings = {};
            
        client.standardAskAsync(message, type, callback, settings);
        expect(mockedWebworks.event.once).toHaveBeenCalledWith("blackberry.ui.dialog", jasmine.any(Number), callback);
        expect(mockedWebworks.execAsync).toHaveBeenCalledWith("blackberry.ui.dialog", "standardAskAsync", { "eventId" : jasmine.any(Number), "message" : message, "type" : type, "callback" : callback, "settings" : settings });
    }