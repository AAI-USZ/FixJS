function () {

        rewire("./emptyModule.js"); // nothing happens here because emptyModule doesn't require anything

        expect(require("./moduleA.js").__set__).to.be(undefined); // if restoring the original node require didn't worked, the module would have a setter



    }