function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};
       
        spyOn(webview, "windowGroup").andReturn(42);
        args.eventId = "12345";
        args.message = "Hello World";
        args.type = 0;
        args.settings = { title: "Hi", size: "large", position: "stuff" };
        args.message = encodeURIComponent(args.message);
        args.type = encodeURIComponent(args.type);
        args.settings = encodeURIComponent(JSON.stringify(args.settings));
        
        index.standardAskAsync(successCB, failCB, args);

        expect(GLOBAL.JNEXT.invoke).toHaveBeenCalled();
        expect(webview.windowGroup).toHaveBeenCalled();
        expect(successCB).toHaveBeenCalledWith();
    }