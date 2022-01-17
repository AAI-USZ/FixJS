function () {

        expect(rewire("./moduleA.js") === require("./moduleA.js")).to.be(true);

        cleanRequireCache();

        expect(rewire("../testModules/moduleA.js") === require("../testModules/moduleA.js")).to.be(true);

        cleanRequireCache();

        expect(rewire("./moduleA.js") === require("./moduleA.js")).to.be(true);

    }