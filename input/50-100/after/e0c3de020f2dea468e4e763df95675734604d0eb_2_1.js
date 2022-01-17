function () {
            spyOn(plugin, "exec").andCallFake(function (request, succ, fail, body) {
                succ(["MyFeatureId"]);
            });

            req.params.service = "default";
            req.params.action = "exec";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(200, encodeURIComponent(JSON.stringify({
                code: 1,
                data: ["MyFeatureId"]
            })));
        }