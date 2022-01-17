function () {

        var rewiredModuleA = rewire("./moduleA.js"),

            rewiredModuleB = rewire("./moduleB.js"),

            consoleMock = {},

            bufferMock = {},

            documentMock = {},

            newFilename = "myFile.js";



        rewiredModuleA.__set__({

            console: consoleMock,

            __filename: newFilename

        });

        expect(rewiredModuleA.getConsole() === consoleMock).to.be(true);

        expect(rewiredModuleB.getConsole() === consoleMock).to.be(false);

        expect(console === consoleMock).to.be(false);

        expect(rewiredModuleA.getFilename() === newFilename).to.be(true);

        expect(rewiredModuleB.getFilename() === newFilename).to.be(false);

        expect(console === newFilename).to.be(false);

        if (typeof window === "undefined") {

            rewiredModuleA.__set__("Buffer", bufferMock);

            expect(rewiredModuleA.getBuffer() === bufferMock).to.be(true);

            expect(rewiredModuleB.getBuffer() === bufferMock).to.be(false);

            expect(Buffer === bufferMock).to.be(false);

        } else {

            rewiredModuleA.__set__("document", documentMock);

            expect(rewiredModuleA.getDocument() === documentMock).to.be(true);

            expect(rewiredModuleB.getDocument() === documentMock === false).to.be(true);

            expect(document === documentMock === false).to.be(true);

        }

    }