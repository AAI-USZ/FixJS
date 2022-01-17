function () {
        // Test with two input buffers.
        var out = flock.ugen.out({
            sources: [
                makeMockUGen(mockLeft), 
                makeMockUGen(mockRight)
            ],
            bus: bufferValueUGen
        }, []);

        // Pull the whole buffer. Expect a stereo interleaved buffer as the result, 
        // containing two copies of the original input buffer.
        var expected = new Float32Array([
            1, 20, 2, 19, 3, 18, 4, 17, 5, 16, 
            6, 15, 7, 14, 8, 13, 9, 12, 10, 11, 11, 10, 
            12, 9, 13, 8, 14, 7, 15, 6, 16, 5,
            17, 4, 18, 3, 19, 2, 20, 1
        ]);
        checkOutput(20, 2, out, expected, "We should receive a stereo buffer, with each buffer interleaved.");
    }