function() {
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
            }