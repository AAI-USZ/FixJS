function(header) {
        var stream = this.stream;
        var frames;
                
        var offset = stream.offset;
        if (!header || header.layer !== 3)
            return false;
        
        // Check for Xing/Info tag
        stream.advance(XING_OFFSETS[header.flags & FLAGS.LSF_EXT ? 1 : 0][header.nchannels() === 1 ? 1 : 0]);
        var tag = stream.readString(4);
        if (tag === 'Xing' || tag === 'Info') {
            var flags = stream.readUInt32();
            if (flags & 0x1) 
                frames = stream.readUInt32();
        }
        
        // Check for VBRI tag (always 32 bytes after end of mpegaudio header)
        stream.advance(offset + 4 + 32 - stream.offset);
        tag = stream.readString(4);
        if (tag == 'VBRI' && stream.readUInt16() === 1) { // Check tag version
            stream.advance(4); // skip delay and quality
            stream.advance(4); // skip size
            frames = stream.readUInt32();
        }
        
        if (!frames)
            return false;
            
        var samplesPerFrame = (header.flags & FLAGS.LSF_EXT) ? 576 : 1152;
        this.emit('duration', (frames * samplesPerFrame) / header.samplerate * 1000 | 0);
            
        return true;
    }