function () {
            var rebuiltRequest = {
                params: {
                    service: DEFAULT_SERVICE,
                    action: DEFAULT_ACTION,
                    ext: "not",
                    method: "here",
                    args: null
                },
                body: "",
                origin: ""
            };
            spyOn(plugin, DEFAULT_ACTION);
            req.params.service = "not";
            req.params.action = "here";

            server.handle(req, res);

            expect(plugin[DEFAULT_ACTION]).toHaveBeenCalledWith(rebuiltRequest, jasmine.any(Function), jasmine.any(Function), jasmine.any(Object), jasmine.any(Object));
        }