function () {

        var rewiredModuleA = rewire("./moduleA.js"),

            newObj = {};



        expect(rewiredModuleA.getMyNumber() === 0).to.be(true);

        rewiredModuleA.__set__("myNumber", 2);

        expect(rewiredModuleA.getMyNumber() === 2).to.be(true);

        rewiredModuleA.__set__("myObj", newObj);

        expect(rewiredModuleA.getMyObj() === newObj).to.be(true);

        rewiredModuleA.__set__("env", "ENVENV");

    }