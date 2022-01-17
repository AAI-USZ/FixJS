function () {
            req.params.service = "default";
            req.params.action = "ThisActionDoesNotExist";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(404, jasmine.any(String));
        }