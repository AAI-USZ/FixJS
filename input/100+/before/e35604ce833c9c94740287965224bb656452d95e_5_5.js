function () {
        var addBuffer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            one = makeMockUGen(addBuffer),
            two = makeMockUGen(addBuffer),
            three = makeMockUGen(addBuffer);

        var inputs = {
            sources: [one]
        };
        var summer = flock.ugen.sum(inputs, new Float32Array(addBuffer.length));
        summer.gen(32);
        deepEqual(summer.output, new Float32Array(addBuffer), "With a single source, the output should be identical to the source input.");
        
        inputs.sources = [one, two, three];
        var expected = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93];
        summer.inputs = inputs;
        summer.gen(32);
        deepEqual(summer.output, new Float32Array(expected), "With three sources, the output consist of the inputs added together.");
    }