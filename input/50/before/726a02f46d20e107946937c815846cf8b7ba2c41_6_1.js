function () {
            req.params.ext = "NotAnExt";
            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        }