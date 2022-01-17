function () {
            req.params.ext = "blackberry.app";
            req.params.method = "NotAMethod";
            defaultPlugin.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        }