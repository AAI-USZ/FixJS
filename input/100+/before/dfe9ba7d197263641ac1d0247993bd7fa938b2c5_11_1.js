function () {

        var rewiredModuleA = rewire("./moduleA.js"),

            rewiredModuleB = rewire("./moduleB.js"),

            consoleMock = {},

            newFilename = "myFile.js";



        rewiredModuleA.__set__({

            console: consoleMock,

            __filename: newFilename

        });

        expect(rewiredModuleA.getConsole()).to.be(consoleMock);

        expect(rewiredModuleB.getConsole()).not.to.be(consoleMock);

        expect(console).not.to.be(consoleMock);

        expect(rewiredModuleA.getFilename()).to.be(newFilename);

        expect(rewiredModuleB.getFilename()).not.to.be(newFilename);

    }