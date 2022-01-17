function () {
    beforeEach(function () {
        //Set up mocking, no need to "spyOn" since spies are included in mock
        
        GLOBAL.JNEXT = {
            invoke : jasmine.createSpy(),
            require : jasmine.createSpy()
        };
        
        index = require(root + "ext/blackberry.ui.dialog/index");
    });

    it("makes sure that JNEXT is initalized", function () {
        expect(GLOBAL.JNEXT.require).toHaveBeenCalled();
    });

    it("makes sure that JNEXT called properly", function () {
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
    });
    
    it("makes sure that a message is specified", function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};
            
        args.eventId = "12345";       
        index.customAskAsync(successCB, failCB, args);
        
        expect(failCB).toHaveBeenCalled();
    });
    
    it("makes sure that buttons are specified", function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};

        args.eventId = "12345";        
        args.message = "Hello World";
        args.message = encodeURIComponent(args.message);
        index.customAskAsync(successCB, failCB, args);
        
        expect(failCB).toHaveBeenCalled();
    });

    it("makes sure that JNEXT is called properly for standard dialogs", function () {
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
    });

    it("makes sure that a message is specified for standard dialogs", function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};

        args.eventId = "12345";
        args.type = 1;
        args.type = encodeURIComponent(args.type);
        index.standardAskAsync(successCB, failCB, args);

        expect(failCB).toHaveBeenCalledWith(-1, "message is undefined");
    });
    
    it("makes sure the type is specified for standard dialogs", function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};
        
        args.eventId = "12345";
        args.message = "Hello World";
        args.message = encodeURIComponent(args.message);
        index.standardAskAsync(successCB, failCB, args);
        
        expect(failCB).toHaveBeenCalledWith(-1, "type is undefined");
    });

    it("makes sure the type is valid for standard dialogs", function () {
        var successCB = jasmine.createSpy(),
            failCB = jasmine.createSpy(),
            args = {};

        args.eventId = "12345";
        args.message = "Hello World";
        args.type = 5;
        args.message = encodeURIComponent(args.message);
        args.type = encodeURIComponent(args.type);

        index.standardAskAsync(successCB, failCB, args);

        expect(failCB).toHaveBeenCalledWith(-1, "invalid dialog type: 5");
    });
}