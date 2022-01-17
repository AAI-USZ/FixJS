function () {
            spyOn(extensionPlugin, "get");

            req.params.service = "extensions";
            req.params.action = "get";

            server.handle(req, res);
            expect(extensionPlugin.get).toHaveBeenCalled();
        }