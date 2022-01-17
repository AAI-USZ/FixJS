function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(false);
            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(403, jasmine.any(Object));
        }