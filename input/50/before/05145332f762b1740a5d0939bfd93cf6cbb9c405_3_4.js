function () {
            spyOn(plugin, "get");

            req.params.service = "extensions";
            req.params.action = "get";

            server.handle(req, res);
            expect(plugin.get).toHaveBeenCalled();
        }