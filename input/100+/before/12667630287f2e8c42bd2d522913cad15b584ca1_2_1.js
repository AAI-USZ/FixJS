function(context, bufferSize) {
        this.context = context;
        this.sampleRate = this.context.sampleRate;
        this.bufferSize = bufferSize;

        this.jsNode = this.context.createJavaScriptNode(
            this.bufferSize, 0, 2
        );
        this.jsNode.onaudioprocess = this.onProcess.bind(this); 

        this.block = new ToneBlock(this.sampleRate, 1);

        this.reset();
        this.sequence = [];
        this.sequenceUpdateHook = null;
        this.running = false;
    }