function (audioParameters) {
 
    this.nSamples = 2048;
    this.wsCurve = new Float32Array(this.nSamples);

    this.context = new webkitAudioContext();
    
    /* todo we want a new() here */
    this.NonDescriptDSP = ND;
    // Distortion is done by a waveshaper node, no need to do it in the process() call
    ND.IMPLEMENT_DISTORTION = false;
    // Start with no distortion. TODO don't like it here.
    this.setDistortion(0);
    this.NonDescriptDSP.init(this.context.sampleRate);
    

    this.source = this.context.createJavaScriptNode(this.nSamples, 0, 1);
    this.source.onaudioprocess = this.process;

    // Create the convolution buffer from the impulse response
    this.buffer = this.context.createBuffer(this.response, false);
    console.log("convolution buffer passed");
    this.convolver = this.context.createConvolver();
    this.convolver.buffer = this.buffer;
    
    // Create the sigmoid curve for  the waveshaper.
    this.createWSCurve(ND.dist, this.nSamples);
    this.sigmaDistortNode = this.context.createWaveShaper();
    this.sigmaDistortNode.curve = this.wsCurve;
    this.sigmaDistortNode.connect(this.convolver);

    this.source.connect(this.sigmaDistortNode);

    // Mmmmh this gain note is not used at the moment. TODO.
    this.gainNode = this.context.createGainNode();
    this.convolver.connect(this.gainNode);

    this.sigmaDistortNode.connect(this.context.destination);
    this.gainNode.connect(this.context.destination);
    
}