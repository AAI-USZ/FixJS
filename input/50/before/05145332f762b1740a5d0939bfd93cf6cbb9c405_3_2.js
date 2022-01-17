function () {
            req.params.service = "not";
            req.params.action = "here";

            server.handle(req, res);
            expect(res.send).toHaveBeenCalledWith(404, jasmine.any(String));
        }