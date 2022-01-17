function () {
    var bridge = require('../../../../lib/plugins/default'),
        Whitelist = require('../../../../lib/policy/whitelist').Whitelist,
        testExtension = require("../../../../ext/app/index"),
        utils = require("../../../../lib/utils");

    beforeEach(function () {
        spyOn(console, "log");
        spyOn(utils, "loadModule").andCallFake(function (module) {
            // on device, "ext/blackberry.app/index.js" would exist since packager would
            // name the extension folder with feature id in compilation time,
            // but in unit test environment, it's the real extension folder being used
            module = "../../../" + module.replace("blackberry.", "");
            return require(module);
        });
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
            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        });

        it("returns 404 if the method is not found", function () {
            req.params.ext = "app";
            req.params.method = "NotAMethod";
            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 404);
        });

        it("checks if the feature is white listed if it exists", function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            bridge.exec(req, res, succ, fail, args);
            expect(Whitelist.prototype.isFeatureAllowed).toHaveBeenCalledWith(req.origin, req.params.ext);
        });


        it("returns 403 if the feature is not white listed", function () {
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(false);

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            bridge.exec(req, succ, fail, args);
            expect(fail).toHaveBeenCalledWith(-1, jasmine.any(String), 403);
        });

        it("calls the method of the extension", function () {
            var env = {"request": req, "response": res};

            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(testExtension, "author");

            req.params.ext = "blackberry.app";
            req.params.method = "author";

            bridge.exec(req, succ, fail, args, env);

            expect(testExtension.author).toHaveBeenCalledWith(succ, fail, args, env);
        });
    });
}