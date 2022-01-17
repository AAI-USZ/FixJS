function () {

        var rewiredModuleA = rewire("./moduleA.js");



        expect(require("./someOtherModule.js").__set__ === undefined).to.be(true);

        expect(require("./someOtherModule.js").__get__ === undefined).to.be(true);

        expect(require("fs").__set__ === undefined).to.be(true);

        expect(require("fs").__get__ === undefined).to.be(true);

    }