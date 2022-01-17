function () {
            req = {
                params: {
                    service: "",
                    action: ""
                },
                body: "",
                origin: ""
            };
            res = {
                send: jasmine.createSpy()
            };
            GLOBAL.frameworkModules = ['ext/blackberry.app/index.js', 'lib/plugins/extensions.js', 'lib/plugins/default.js'];
        }