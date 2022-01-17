function() {
        var stream = this.stream,
            pos    = stream.offset;

        if (pos > 0) {
            console.log("[demuxer] Found more data @ " + pos);
            while (stream.available(1)) {
                buf = stream.readSingleBuffer(stream.remainingBytes());
                this.emit('data', buf);
            }
            return;
        }

        if (!stream.available(1084)) {
            console.log("[demuxer] Only " + stream.remainingBytes() + " of required 1084 bytes available. Waiting.");
            this.once('available', this.readChunk);
            return;
        }

        // The title is 20 bytes long, with all null bytes trimmed.
        var title = trimNulls(stream.peekString(0, 20));
        this.emit('metadata', {
            'title': title
        });

        // Store identifier if it's not already there.
        if (!('identifier' in this)) {
            this.identifier = this.getIdentifier(stream);

            if (!(this.identifier in MODDemuxer.channelCountByIdentifier)) {
                this.emit('error', "Invalid MOD file.");
            }
        }

        this.emit('format', {
            formatID: 'mod',
            sampleRate: 44100, // is this right?
            channelsPerFrame: MODDemuxer.channelCountByIdentifier[this.identifier],
            bitsPerChannel: 16   // is this right?
        });

        while (stream.available(1)) {
            buf = stream.readSingleBuffer(stream.remainingBytes());
            this.emit('data', buf);
        }
    }