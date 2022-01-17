function() {
        if (this.dirty) {
            this.hzSeq = this.hzFromStepSeq();
            this.attackSeq = this.flatAttackSeq();
            this.formattedSeq = this.mergeSequences();
            this.toneRow.updateSequence(this.formattedSeq);
            this.uri.update({
                seq: this.stepSeq,
                rate: this.options.bpm,
                len: this.options.stepCount
            });
            this.dirty = false;
        }
    }