function () {

        expect(rewire("./moduleA.js")).to.be(require("./moduleA.js"));

        cleanRequireCache();

        expect(rewire("../testModules/moduleA.js")).to.be(require("../testModules/moduleA.js"));

        cleanRequireCache();

        expect(rewire("./moduleA.js")).to.be(require("./moduleA.js"));

    }