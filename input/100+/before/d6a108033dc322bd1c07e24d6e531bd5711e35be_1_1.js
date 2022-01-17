function() {
    this.createInputSamples();
    this.createOutputSamples();

    this.generate();
    
    //Visualization Buffer
    //This is our buffer size - this.audiolet.device.bufferSize;
    if(!this.visBuffer){
        this.visBuffer = new AudioletBuffer(this.audiolet.device.numberOfChannels, this.audiolet.device.bufferSize);
        this.visIndex = 0;
    }
    // this.audiolet.device.numberOfChannels can be different than this.outputs[0].numberOfChannels.
    // We're just going to use the first outputs number for now
    for(var i = 0; this.outputs[0].numberOfChannels; i++){
        var bufferChannel = this.visBuffer.getChannelData(i);
        if(this.visIndex < this.audiolet.device.bufferSize){
            //We're only using the first output here.
            this.bufferChannel[this.visIndex] = this.outputs[0].samples[i];
            this.visIndex++;
        }else{
            this.visIndex = 0;
        }
    }
}