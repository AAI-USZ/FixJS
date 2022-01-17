function(algorithm) {
        if (typeof algorithm === 'string') {
            var generator = patt[algorithm];
        } else if (typeof algorithm === 'function') {
            var generator = algorithm;
        } else if (typeof algorithm === 'undefined') {
            var self = this;
            var generator = function(idx) {
                var density = 4;
                var randVal = parseInt(Math.random() * self.options.maxNote);
                var note = randVal % density ? randVal : 0;
                return parseInt(note);
            }
        }
        var stepSeq = [];
        for (var i = 0; i < this.options.stepCount; i++) {
            stepSeq[i] = generator(i);
        }
        return stepSeq;
    }