function () {
        var mockUGen = flock.test.makeMockUGen(new Float32Array(64));
        
        // Non-existent input.
        var val = mockUGen.input("cat");
        equals(val, undefined, "Getting a non-existent input should return undefined.");
        ok(!mockUGen.inputs.cat, "When getting a non-existent input, it should not be created.");
        
        // Setting a previously non-existent input.
        setAndCheckInput(mockUGen, "cat", {
            ugen: "flock.test.mockUGen"
        });
        
        // Replacing an existing input with an ugenDef.
        setAndCheckInput(mockUGen, "cat", {
            id: "new-cat",
            ugen: "flock.test.mockUGen"
        });
        equals(mockUGen.input("cat").id, "new-cat", "The new input should have the appropriate ID.");
        
        // And with an array of ugenDefs.
        var defs = [
            {
                id: "first-cat",
                ugen: "flock.test.mockUGen"
            },
            {
                id: "second-cat",
                ugen: "flock.test.mockUGen"
            }
        ];
        setAndCheckArrayInput(mockUGen, "cat", defs, function (i, def) {
            equals(mockUGen.input("cat")[i].id, def.id);
        });

        // And with a scalar.
        setAndCheckInput(mockUGen, "cat", 500);
        equals(mockUGen.inputs.cat.model.value, 500, "The input ugen should be a value ugen with the correct model value.");
        
        // And an array of scalars.
        var vals = [100, 200, 300];
        setAndCheckArrayInput(mockUGen, "fish", vals, function (i, val) {
            equals(mockUGen.input("fish")[i].model.value, val);
        });
    }