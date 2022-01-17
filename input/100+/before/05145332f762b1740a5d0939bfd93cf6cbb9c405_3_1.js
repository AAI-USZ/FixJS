function () {
        var req, res;

        beforeEach(function () {
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
        });

        it("returns 404 if the plugin doesn't exist", function () {
            req.params.service = "not";
            req.params.action = "here";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(404, jasmine.any(String));
        });

        it("returns 404 if the action doesn't exist", function () {
            req.params.service = "extensions";
            req.params.action = "ThisActionDoesNotExist";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(404, jasmine.any(String));
        });
        
        it("calls the action method on the plugin", function () {
            spyOn(plugin, "get");

            req.params.service = "extensions";
            req.params.action = "get";

            server.handle(req, res);
            expect(plugin.get).toHaveBeenCalled();
        });

        it("returns the result and code 1 when success callback called", function () {
            spyOn(plugin, "get").andCallFake(function (request, succ, fail, body) {
                succ(["MyFeatureId"]);
            });

            req.params.service = "extensions";
            req.params.action = "get";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(200, {
                code: 1,
                data: ["MyFeatureId"]
            });
        });

        it("returns the result and code -1 when fail callback called", function () {
            spyOn(plugin, "get").andCallFake(function (request, succ, fail, body) {
                fail(-1, "ErrorMessage");
            });

            req.params.service = "extensions";
            req.params.action = "get";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(200, {
                code: -1,
                data: null,
                msg: "ErrorMessage"
            });
        });
    }