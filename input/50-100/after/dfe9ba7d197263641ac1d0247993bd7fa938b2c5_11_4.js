function () {

        var rewiredModuleA = rewire("./moduleA.js");



        expect(rewiredModuleA.__get__("myNumber") === rewiredModuleA.getMyNumber()).to.be(true);

        expect(rewiredModuleA.__get__("myObj") === rewiredModuleA.getMyObj()).to.be(true);

    }