function() {
        var stream    = this.stream;

        if (stream.offset == 0) {
            // Need 20 bytes for title
            if (stream.remainingBytes() < 20) {
                return this.once('available', this.readChunk);
            }

            stream.advance(20);
        }

        while (this.isSample(stream.offset)) {
            var sample,
                pos = stream.remainingBytes();

            // Need 30 bytes for sample.
            if (pos < 30) {
                return this.once('available', this.readChunk);
            }

            sample = this.samples[this.samples.length] = this.getSample();
            //console.log("[decoder] Found sample @ " + pos + ", length: " + sample['length']);
            //console.log("          Name: " + sample['name']);
        }

        if (stream.offset == 950) {
            this.readPositionData();

            var identifier = stream.readString(4);

            this.channelCount = MODDemuxer.channelCountByIdentifier[identifier];
            if (!this.channelCount) {
                this.channelCount = 4;
            }

            this.readPatterns();

            this.readSampleData();

            // Play the audio!
            this.setBpm(125);
            this.setChannels();
            this.loadPosition(0);
        }

        //console.log("[decoder] Found something @ " + stream.offset);
        //console.log("[decoder] Remaining: " + stream.remainingBytes());

        if (stream.offset >= 950) {
            var samples = this.getSamples();
//console.log(samples);return;
            this.emit('data', samples);
        }

        //console.log("[decoder] Offset:    " + stream.offset);
        //console.log("[decoder] Remaining: " + stream.remainingBytes());
    }