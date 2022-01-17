function () {
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
        }