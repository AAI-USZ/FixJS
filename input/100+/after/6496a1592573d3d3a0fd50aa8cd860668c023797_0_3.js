function() {
        for (var s = 0; s < this.sampleCount; s++) {
            //console.log("[decoder] Sample data @ " + this.stream.offset);

            this.samples[s].startOffset = this.stream.offset;
            this.sampleData[s] = new Uint8Array(this.samples[s].length, "uint8");
            for (var i = 0; i < this.samples[s].length; i++) {
                this.sampleData[s][i] = this.stream.readUInt8();
            }
        }
    }