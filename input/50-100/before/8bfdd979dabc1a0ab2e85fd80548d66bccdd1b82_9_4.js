function (done) {

        var rewiredModuleA = rewire("./moduleA.js"),

            mockedFs = {

                readFileSync: function (file) {

                    expect(file).to.be("bla.txt");

                    done();

                }

            };



        rewiredModuleA.__set__("fs", mockedFs);

        rewiredModuleA.readFileSync();

    }