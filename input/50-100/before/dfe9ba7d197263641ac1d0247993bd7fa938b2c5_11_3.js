function () {

        var rewiredModuleA = rewire("./moduleA.js"),

            newObj = {};



        expect(rewiredModuleA.getMyNumber()).to.be(0);

        rewiredModuleA.__set__("myNumber", 2);

        expect(rewiredModuleA.getMyNumber()).to.be(2);

        rewiredModuleA.__set__("myObj", newObj);

        expect(rewiredModuleA.getMyObj()).to.be(newObj);

        rewiredModuleA.__set__("env", "ENVENV");

    }