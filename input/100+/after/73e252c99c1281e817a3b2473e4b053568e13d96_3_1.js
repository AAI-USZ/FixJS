function() {
        this.uri.parseHash();

        setTimeout(function() {
        }.bind(this), 500);
             
        var length = this.uri.len || this.randomStepCount();
        var bpm = this.uri.rate || this.randomBPM();
        var seq = this.uri.seq && this.uri.seq.length 
            ? this.uri.seq.split(',') : this.generateStepSeq(length)
        /*
        var seq;
        if (this.uri.seq && this.uri.seq.length) {
            seq = this.uri.seq.split(',');
        } else {
            seq = this.generateStepSeq(length);
        }
        */
        this.update({
            stepCount: length,
            bpm: bpm,
            seq: seq
        });

    }