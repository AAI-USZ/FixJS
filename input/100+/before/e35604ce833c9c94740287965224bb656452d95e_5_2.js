function () {
        // Test with a single input buffer being multiplexed by ugen.out.
        var mockLeftUGen = makeMockUGen(mockLeft);
        var out = flock.ugen.out({sources: mockLeftUGen, bus: bufferValueUGen}, []);

        // Pull the whole buffer.
        var expected = new Float32Array([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ]);
        checkOutput(40, 1, out, expected, 
            "We should receive a mono buffer containing two copies of the original input buffer.");

        // Pull a partial buffer.
        expected = new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        checkOutput(20, 1, out, expected, 
            "We should receive a mono buffer containing the input buffer unmodified.");
    }