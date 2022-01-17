function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};
        
        spyOn(webview, "windowGroup").andReturn(42);
        args.eventId = "12345";
        args.message = "Hello World";
        args.buttons = [ "Yes", "No" ];
        args.settings = { title: "Hi", size: "large", position: "stuff" };
        args.message = encodeURIComponent(args.message);
        args.buttons = encodeURIComponent(JSON.stringify(args.buttons));
        args.settings = encodeURIComponent(JSON.stringify(args.settings));
        
        index.customAskAsync(successCB, failCB, args);
        
        expect(webview.windowGroup).toHaveBeenCalled();
        expect(GLOBAL.JNEXT.invoke).toHaveBeenCalled();
    }