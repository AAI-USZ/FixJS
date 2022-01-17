function () {
            var env = {"request": req, "response": res};

            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            defaultPlugin.exec(req, succ, fail, args, env);

            expect(testExtension.author).toHaveBeenCalledWith(succ, fail, args, env);
        }