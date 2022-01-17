function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(false);

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 403);
        }