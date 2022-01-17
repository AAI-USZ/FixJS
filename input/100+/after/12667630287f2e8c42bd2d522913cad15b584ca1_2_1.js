function(context, bufferLength) {
        this.context = context;
        this.sampleRate = this.context.sampleRate;
        this.bufferLength = bufferLength;

        this.jsNode = this.context.createJavaScriptNode(
            this.bufferLength, 0, 2
        );
        this.jsNode.onaudioprocess = this.onProcess.bind(this); 

        var baseGain = 0.8;
        this.block = new ToneBlock(this.sampleRate, baseGain);

        this.reset();
        this.sequence = [];
        this.sequenceUpdateHook = null;
        this.running = false;
    }