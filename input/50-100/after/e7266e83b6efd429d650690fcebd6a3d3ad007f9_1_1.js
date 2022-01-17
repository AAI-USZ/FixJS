function () {
        var message = "hello world",
            buttons = [ ],
            callback,
            settings = {};
            
        client.customAskAsync(message, buttons, callback, settings);
        expect(mockedWebworks.event.once).toHaveBeenCalledWith("blackberry.ui.dialog", "blackberry.ui.dialogEventId", callback);
        expect(mockedWebworks.execAsync).toHaveBeenCalledWith("blackberry.ui.dialog", "customAskAsync", { "eventId" : "blackberry.ui.dialogEventId", "message" : message, "buttons" : buttons, "callback" : callback, "settings" : settings });
    }