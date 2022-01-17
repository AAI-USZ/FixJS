function(header) {
        var stream = this.stream;
        var encoding = stream.readUInt8();
        var start = stream.offset;
        
        while (stream.readUInt8() !== 0); // mime type
        while (stream.readUInt8() !== 0); // picture type
        while (stream.readUInt8() !== 0); // description
        
        return stream.readBuffer(header.length - (stream.offset - start));
    }