function () {
            spyOn(plugin, DEFAULT_SERVICE);
            req.params.service = "not";
            req.params.action = "here";

            server.handle(req, res);
            expect(plugin[DEFAULT_SERVICE]).toHaveBeenCalled();
        }