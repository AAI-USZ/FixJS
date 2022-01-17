function () {

        var rewiredModuleA = rewire("./moduleA.js");



        expect(require("./someOtherModule.js").__set__).to.be(undefined);

        expect(require("./someOtherModule.js").__get__).to.be(undefined);

        expect(require("fs").__set__).to.be(undefined);

        expect(require("fs").__get__).to.be(undefined);

    }