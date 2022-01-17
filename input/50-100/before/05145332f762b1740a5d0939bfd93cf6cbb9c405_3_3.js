function () {
            req = {
                params: {
                    service: "bridge",
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
                body: "" 
            };
            res = {
                send: jasmine.createSpy()
            };
        }