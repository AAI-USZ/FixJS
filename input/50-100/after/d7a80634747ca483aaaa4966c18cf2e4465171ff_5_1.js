function () {
            req = {
                params: {
                    service: "default",
                    action: "exec",
                    ext: "blackberry.app",
                    method: "author",
                    args: null,
                    origin: null
                },
                headers: {
                    host: ""
                },
                url: "",
                body: "",
                origin: "" 
            };
            res = {
                send: jasmine.createSpy()
            };
            GLOBAL.frameworkModules = ['ext/app/index.js', 'lib/plugins/extensions.js', 'lib/plugins/default.js'];
        }