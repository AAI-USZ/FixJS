function(evt) {
        var buffer = evt.outputBuffer,
            stereoBuffer = [
                buffer.getChannelData(0),
                buffer.getChannelData(1)
            ];
        var hertz = this.sequence[this.seqIdx][1],
            nextSeqIdx = (this.seqIdx + 1) % this.sequence.length,
            nextAttack = this.nextAttack = this.sequence[nextSeqIdx][0],
            nextHertz = this.sequence[nextSeqIdx][1];
        var rampOnset = nextAttack - (this.block.rampLen / this.sampleRate);

        // Special cases for first note in sequence
        if (this.seqIdx === 0 && this.newNote) {
            if (this.firstLoop) {
                // Absolute beginning, so fire the first beat immediately 
                this.stageBeatEvent(this.seqIdx, nextAttack, 0);
                this.firstLoop = false;
            } else {
                // Looping, so rewind elapsed by unused buffer 
                this.elapsed = buffer.duration - this.stepSec;
            }
        }

        // Ramp-out begins within this buffer
        // TODO: (optionally?) join adjacent repeated notes (no ramp out)
        if (rampOnset <= this.elapsed + buffer.duration) {
            this.newNote = true;
            this.stepSec = nextAttack - this.elapsed;

            // If ramp-out crosses buffer boundary, fudge it
            if (this.elapsed + buffer.duration < nextAttack) {
                var blockLength = buffer.length;
            } else { 
                var blockLength = parseInt(this.stepSec * this.sampleRate);
            }

            this.block.fillBuffer(
                hertz, blockLength, stereoBuffer, 0, true, 0
            );

            // Perform sequence update between notes
            if (this.sequenceUpdateHook) {
                this.sequenceUpdateHook();
            }

            // Begin next note
            this.seqIdx = nextSeqIdx;
            hertz = this.sequence[nextSeqIdx][1];
            // Reset phase
            this.block.writeSample = 0;

            this.stageBeatEvent(this.seqIdx, nextAttack, this.stepSec);

            var offset = blockLength;
            blockLength = buffer.length - offset;

            this.block.fillBuffer(
                hertz, blockLength, stereoBuffer, offset, false, 0
            );
        } else {
            // Full single-Hz buffer
            this.newNote = false;
            this.block.fillBuffer(
                hertz, buffer.length, stereoBuffer, 0, false, 0
            );
        }
        this.elapsed += buffer.duration;
    }