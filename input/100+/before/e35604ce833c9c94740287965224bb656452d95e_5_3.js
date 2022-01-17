function () {
        // Test with a single mono input buffer.
        var mockLeftUGen = makeMockUGen(mockLeft);
        var out = flock.ugen.out({sources: mockLeftUGen, bus: bufferValueUGen, expand: stereoExpandValueUGen}, []);

        // Pull the whole buffer.
        var expected = new Float32Array([
            1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 
            6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 
            12, 12, 13, 13, 14, 14, 15, 15, 16, 16,
            17, 17, 18, 18, 19, 19, 20, 20
        ]);
        checkOutput(20, 2, out, expected, 
            "We should receive a stereo buffer containing two copies of the original input buffer.");
    }