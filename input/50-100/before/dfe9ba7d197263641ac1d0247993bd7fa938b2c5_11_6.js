function () {

        var rewiredModuleA = rewire("./moduleA.js"),

            someOtherModule,

            mockedFs = {};



        rewiredModuleA.__set__("fs", mockedFs);

        someOtherModule = require("./someOtherModule.js");

        expect(someOtherModule.fs).not.to.be(mockedFs);

    }