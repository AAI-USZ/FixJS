function () {
            req.params.ext = "NotAnExt";
            defaultPlugin.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        }