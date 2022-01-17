function(length, algorithm) {
        if (typeof algorithm === 'string') {
            var generator = patt[algorithm];
        } else if (typeof algorithm === 'function') {
            var generator = algorithm;
        } else if (! algorithm) {
            var self = this;
            var generator = function(idx) {
                var density = 4;
                var randVal = parseInt(Math.random() * self.options.maxNote);
                var note = randVal % density ? randVal : 0;
                return parseInt(note);
            }
        }
        var stepSeq = [];
        var length = length || this.options.stepCount;
        for (var i = 0; i < length; i++) {
            stepSeq[i] = generator(i);
        }
        return stepSeq;
    }