function () {
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
        }