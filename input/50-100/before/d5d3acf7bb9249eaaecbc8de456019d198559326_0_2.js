function(header) {
        var stream = this.stream;
        var encoding = stream.readUInt8(),
            format = stream.readUInt24(),
            type = stream.readUInt8();
            
        var start = stream.offset;        
        while (stream.readUInt8() !== 0); // description
        
        return stream.readBuffer(header.length - (stream.offset - start));
    }