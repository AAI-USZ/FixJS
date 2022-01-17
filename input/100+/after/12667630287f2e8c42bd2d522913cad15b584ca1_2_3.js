function() {
            // Store current sequence, blank, disconnect and restore
            var restoreElapsed = this.elapsed;

            //console.log(this.elapsed, this.stepSec);
            
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

            //console.log(this.bufferLength / this.sampleRate);
            
            // Somewhat arbitrary 110 ms pause - otherwise we get a click
            // FIXME: Explain: 
            setTimeout(function() {
                //console.log(this.newNote, this.elapsed, restoreElapsed);
                //console.log(this.elapsed - restoreElapsed);
                if (this.elapsed < restoreElapsed) {
                    console.log('crak?', restoreElapsed + this.stepSec, this.elapsed, restoreElapsed, this.sequence[this.sequence.length - 1], this.sequence[this.seqIdx][0]);
                } else {
                    console.log('ok', restoreElapsed + this.stepSec, this.elapsed, restoreElapsed, this.sequence[this.seqIdx][0]);
                }
                this.jsNode.disconnect();
                this.running = false;
                // Reset to next note
                this.sequence = restoreSequence;
                this.elapsed = restoreElapsed + this.stepSec;

                this.elapsed = this.seqIdx == 0 ? 0
                    : this.sequence[this.seqIdx][0];

                this.block.writeSample = 0;
                // Force first note case
                //this.newNote = true;
                this.onComplete && this.onComplete();
            }.bind(this), 110);//this.bufferLength / this.sampleRate * 1000 + 10);//0);//110);
        }