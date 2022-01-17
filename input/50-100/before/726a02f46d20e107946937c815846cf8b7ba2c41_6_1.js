function () {
            req.params.ext = "blackberry.app";
            req.params.method = "NotAMethod";
            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        }