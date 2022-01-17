function(params) {
        var bpmChanged = params.bpm !== undefined
            && params.bpm !== this.options.bpm;
        bpmChanged && (this.options.bpm = params.bpm);
        
        var stepCountChanged = params.stepCount !== undefined 
            && params.stepCount !== this.options.stepCount;
        if (stepCountChanged) {
            if (! params.seq) {
                var diff = params.stepCount - this.options.stepCount;
                while (diff < 0) {
                    this.stepSeq.pop();
                    diff++;
                }
                while (diff > 0) {
                    this.stepSeq.push('0')
                    diff--;
                }
            }
            this.options.stepCount = params.stepCount;
        }

        var seqChanged = false;
        if (params.seq) {
            if (params.seq.length !== this.stepCount) {
                seqChanged = true;
            } else {
                for (var idx = 0; idx < params.seq; idx++) {
                    if (this.stepSeq[idx] !== params.seq[idx]) {
                        seqChanged= true;
                        break;
                    }
                }
            }
            this.stepSeq = params.seq;
        }
        
        var stepOverflow = this.toneRow.seqIdx >= this.options.stepCount - 1;
        var mustPause = this.isRunning() && (bpmChanged || stepCountChanged);

        var updateCallback = function() {
            stepOverflow && this.reset();
            this.buildSequence();
            if (bpmChanged) {
                var lastAttack = this.toneRow.seqIdx > 0 ?
                    this.toneRow.sequence[this.toneRow.seqIdx][0] : 0;
                this.toneRow.elapsed = lastAttack;
            }
            mustPause && this.unpause();
        }.bind(this);

        // TODO: is this overkill, redundant wrt buildSequence check?
        this.dirty = bpmChanged || stepCountChanged || seqChanged;
        if (this.dirty) {
            if (this.isRunning()) {
                if (mustPause) {
                    this.toneRow.pause(updateCallback);
                } else {
                    this.toneRow.setUpdateHook(updateCallback);
                }
            } else {
                updateCallback();
            }
        }
    }