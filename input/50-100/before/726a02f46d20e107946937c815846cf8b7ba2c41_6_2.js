function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            bridge.exec(req, res, succ, fail, args);
            expect(Whitelist.prototype.isFeatureAllowed).toHaveBeenCalledWith(req.origin, req.params.ext);
        }