function () {
        GLOBAL.window.qnx.webplatform = mockedWebPlatform;
        GLOBAL.window.webworks = mockedWebWorks;
        GLOBAL.qnx = {
            callExtensionMethod: jasmine.createSpy("bond"),
            webplatform : {
                getController : function () {
                    return mockedController;
                },
                getApplication : function () {
                    return mockedApplication;
                }
            }
        };
        GLOBAL.alert = jasmine.createSpy();
        GLOBAL.XMLHttpRequest = function () {
            return {
                        open            : jasmine.createSpy(),
                        responseType    : jasmine.createSpy(),
                        onload          : jasmine.createSpy(),
                        send            : jasmine.createSpy()
                    };
        };
        GLOBAL.downloadSharedFile = jasmine.createSpy();
        actions = require(_apiDir + '/actions'),
        invocation = window.qnx.webplatform.getApplication().invocation
    }