function(header) {
        var stream = this.stream;
        var start = stream.offset;
        var encoding = stream.readUInt8();
        
        while (stream.readUInt8() !== 0); // mime type
        stream.advance(1);                // picture type
        while (stream.readUInt8() !== 0); // description
        
        return stream.readBuffer(header.length - (stream.offset - start));
    }