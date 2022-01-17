function (done) {

        var rewiredModuleA = rewire("./moduleA.js"),

            mockedFs = {

                readFileSync: function (file) {

                    expect(file === "bla.txt").to.be(true);

                    done();

                }

            };



        rewiredModuleA.__set__("fs", mockedFs);

        rewiredModuleA.readFileSync();

    }