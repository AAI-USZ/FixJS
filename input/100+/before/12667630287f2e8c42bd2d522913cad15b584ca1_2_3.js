function() {
            // Store current sequence, blank, disconnect and restore
            var restoreElapsed = this.elapsed;
            var restoreSequence = [];
            // Manually copy seqence steps to restore
            for (var i in this.sequence) {
                restoreSequence[i] = this.sequence[i].slice();
            }
            // Empty sequence - set all notes to zero
            this.sequence = this.sequence.map(function(el, idx) {
                el[1] = 0;
                return el;
            });
            // FIXME:
            // Arbitrary 110 ms pause - otherwise we get a click
            setTimeout(function() {
                this.jsNode.disconnect();
                this.running = false;
                // Reset to next note
                this.sequence = restoreSequence;
                this.elapsed = restoreElapsed;
                this.block.writeSample = 0;
                this.newNote = true;
                this.onComplete && this.onComplete();
            }.bind(this), 110);
        }