function() {
        this.uri.parseHash();
        this.options.stepCount = this.uri.length || this.randomStepCount();
        this.options.bpm = this.uri.rate || this.randomBPM();
        this.stepSeq = this.uri.seq ? this.uri.seq.split(',')
            : this.generateStepSeq(); 
    }