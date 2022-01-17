function(nullMask) {
    var maskKey;
    var headerLength = 2;
    var data;
    var outputPos;
    var firstByte = 0x00;
    var secondByte = 0x00;
    
    if (this.fin) {
        firstByte |= 0x80;
    }
    if (this.rsv1) {
        firstByte |= 0x40;
    }
    if (this.rsv2) {
        firstByte |= 0x20;
    }
    if (this.rsv3) {
        firstByte |= 0x10;
    }
    if (this.mask) {
        secondByte |= 0x80;
    }

    firstByte |= (this.opcode & 0x0F);

    // the close frame is a special case because the close reason is
    // prepended to the payload data.
    if (this.opcode === 0x08) {
        this.length = 2;
        if (this.binaryPayload) {
            this.length += this.binaryPayload.length;
        }
        data = new Buffer(this.length);
        ctio.wuint16(this.closeStatus, 'big', data, 0);
        if (this.length > 2) {
            this.binaryPayload.copy(data, 2);
        }
    }
    else if (this.binaryPayload) {
        data = this.binaryPayload;
        this.length = data.length;
    }
    else {
        this.length = 0;
    }

    if (this.length <= 125) {
        // encode the length directly into the two-byte frame header
        secondByte |= (this.length & 0x7F);
    }
    else if (this.length > 125 && this.length <= 0xFFFF) {
        // Use 16-bit length
        secondByte |= 126;
        headerLength += 2;
    }
    else if (this.length > 0xFFFF) {
        // Use 64-bit length
        secondByte |= 127;
        headerLength += 8;
    }

    var output = new Buffer(this.length + headerLength + (this.mask ? 4 : 0));

    // write the frame header
    output[0] = firstByte;
    output[1] = secondByte;

    outputPos = 2;
    
    if (this.length > 125 && this.length <= 0xFFFF) {
        // write 16-bit length
        ctio.wuint16(this.length, 'big', output, outputPos);
        outputPos += 2;
    }
    else if (this.length > 0xFFFF) {
        // write 64-bit length
        ctio.wuint64([0x00000000, this.length], 'big', output, outputPos);
        outputPos += 8;
    }
    
    if (this.length > 0) {
        if (this.mask) {
            if (!nullMask) {
                // Generate a mask key
                maskKey = parseInt(Math.random()*0xFFFFFFFF);
            }
            else {
                maskKey = 0x00000000;
            }
            ctio.wuint32(maskKey, 'big', this.maskBytes, 0);
            this.maskPos = 0;

            // write the mask key
            this.maskBytes.copy(output, outputPos);
            outputPos += 4;
        
            data.copy(output, outputPos);

            xor(output.slice(outputPos), this.maskBytes, outputPos + data.length);

        }
        else {
            data.copy(output, outputPos);
        }
    }
    
    return output;
}