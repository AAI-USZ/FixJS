function () {
        var message = "hello world",
            buttons = [ ],
            callback,
            settings = {};
            
        client.customAskAsync(message, buttons, callback, settings);
        expect(mockedWebworks.event.once).toHaveBeenCalledWith("blackberry.ui.dialog", jasmine.any(Number), callback);
        expect(mockedWebworks.execAsync).toHaveBeenCalledWith("blackberry.ui.dialog", "customAskAsync", { "eventId" : jasmine.any(Number), "message" : message, "buttons" : buttons, "callback" : callback, "settings" : settings });
    }