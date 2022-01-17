function () {

        var rewiredModuleA = rewire("./moduleA.js");



        expect(rewiredModuleA.__get__("myNumber")).to.be(rewiredModuleA.getMyNumber());

        expect(rewiredModuleA.__get__("myObj")).to.be(rewiredModuleA.getMyObj());

    }