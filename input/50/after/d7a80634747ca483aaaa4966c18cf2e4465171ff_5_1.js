function () {
            req = {
                params: {
                    service: "",
                    action: ""
                },
                body: "" 
            };
            res = {
                send: jasmine.createSpy()
            };
            GLOBAL.frameworkModules = ['ext/app/index.js', 'lib/plugins/extensions.js', 'lib/plugins/default.js'];
        }