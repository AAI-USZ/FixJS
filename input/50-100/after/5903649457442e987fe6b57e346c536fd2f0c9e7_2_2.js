function () {
            spyOn(plugin, "exec").andCallFake(function (request, succ, fail, body) {
                fail(-1, "ErrorMessage");
            });

            req.params.service = "default";
            req.params.action = "exec";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(200, encodeURIComponent(JSON.stringify({
                code: -1,
                data: null,
                msg: "ErrorMessage"
            })));
        }