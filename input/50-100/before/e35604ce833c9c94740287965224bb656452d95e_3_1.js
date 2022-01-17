function (outputBufferGenerator, rate) {
        rate = rate || flock.rates.AUDIO;
        return {
            rate: rate,
            output: flock.generate(64, outputBufferGenerator),
            onInputChanged: function () {}
        };
    }