function () {

        var rewiredModule;



        if (typeof window === "undefined") {

            global.someGlobalVar = "test";

            rewiredModule = rewire("./moduleA.js");

            rewiredModule.__set__("someGlobalVar", "other value");

            expect(global.someGlobalVar === "test").to.be(true);

            expect(rewiredModule.__get__("someGlobalVar") === "other value").to.be(true);

            delete global.someGlobalVar;

        } else {

            window.someGlobalVar = "test";

            rewiredModule = rewire("./moduleA.js");

            rewiredModule.__set__("someGlobalVar", "other value");

            expect(window.someGlobalVar === "test").to.be(true);

            expect(rewiredModule.__get__("someGlobalVar") === "other value").to.be(true);

            delete window.someGlobalVar;

        }

    }