function () {
    var defaultPlugin = require('../../../../lib/plugins/default'),
        Whitelist = require('../../../../lib/policy/whitelist').Whitelist,
        testExtension = require("../../../../ext/blackberry.app/index");

    beforeEach(function () {
        spyOn(console, "log");
    });

    describe("when handling requests", function () {
        var req, res, succ, fail, args;

        beforeEach(function () {
            req = {
                origin: "http://www.origin.com",
                params: {}
            };
            res = {
                send: jasmine.createSpy()
            };
            succ = jasmine.createSpy();
            fail = jasmine.createSpy();
            args = {};
            GLOBAL.frameworkModules = ["ext/blackberry.app/index.js"];
        });

        afterEach(function () {
            delete GLOBAL.frameworkModules;
        });

        it("returns 404 if the extension is not found", function () {
            req.params.ext = "NotAnExt";
            defaultPlugin.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        });

        it("returns 404 if the method is not found", function () {
            req.params.ext = "blackberry.app";
            req.params.method = "NotAMethod";
            defaultPlugin.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        });

        it("checks if the feature is white listed if it exists", function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            defaultPlugin.exec(req, res, succ, fail, args);
            expect(fail).wasNotCalled();
            expect(Whitelist.prototype.isFeatureAllowed).toHaveBeenCalledWith(req.origin, req.params.ext);
        });


        it("returns 403 if the feature is not white listed", function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(false);

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            defaultPlugin.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 403);
        });

        it("calls the method of the extension", function () {
            var env = {"request": req, "response": res};

            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            defaultPlugin.exec(req, succ, fail, args, env);

            expect(testExtension.author).toHaveBeenCalledWith(succ, fail, args, env);
        });

        it("calls a multi-level method of the extension", function () {
            var env = {"request": req, "response": res};

            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");
            testExtension.author.a = {
                b : {
                    c : jasmine.createSpy()
                }
            };

            req.params.ext = "blackberry.app";
            req.params.method = "author/a/b/c";

            defaultPlugin.exec(req, succ, fail, args, env);

            expect(fail).wasNotCalled();
            expect(testExtension.author.a.b.c).toHaveBeenCalledWith(succ, fail, args, env);
        });

        it("throws a 404 is a multi-level method is not found", function () {
            var env = {"request": req, "response": res};

            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");
            testExtension.author.a = {
            };

            req.params.ext = "blackberry.app";
            req.params.method = "author/a/b/c";

            defaultPlugin.exec(req, succ, fail, args, env);

            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        });
    });
}