function (done) {
            require("classes/World", [
                "./Animal"
            ], function (
                Animal
            ) {
                chai.assert.isNull(new Animal().getSpecies());

                done();
            });
        }