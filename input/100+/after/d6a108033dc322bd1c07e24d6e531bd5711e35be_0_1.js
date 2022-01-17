function() {
    this.createInputSamples();
    this.createOutputSamples();

    this.generate();
    
    //Visualization Buffer
    if(!this.visBuffer){
        var bufferSize = 4096; //Want to keep it the same across browsers. This is what chrome was choosing.
        var numberOfChannels = 2;
        if(this.outputs && this.outputs[0]){
            numberOfChannels = this.outputs[0].numberOfChannels;
        }
        this.visBuffer = new AudioletBuffer(numberOfChannels, bufferSize);
        this.visIndex = 0;
    }
    // this.audiolet.device.numberOfChannels can be different than this.outputs[0].numberOfChannels.
    // We're just going to use the first outputs number for now
    if(this.outputs && this.outputs[0]){
        for(var i = 0; i < this.outputs[0].numberOfChannels; i++){
            var bufferChannel = this.visBuffer.getChannelData(i);
            if(this.visIndex < this.visBuffer.length){
                //We're only using the first output here.
                bufferChannel[this.visIndex] = this.outputs[0].samples[i];
                this.visIndex++;
            }else{
                this.visIndex = 0;
            }
        }
    }
}