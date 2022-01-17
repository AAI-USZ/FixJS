function(bufferList, fragmentationType) {
    var temp;
    if (this.parseState === DECODE_HEADER) {
        if (bufferList.length >= 2) {
            bufferList.joinInto(this.frameHeader, 0, 0, 2);
            bufferList.advance(2);
            var firstByte = this.frameHeader[0];
            var secondByte = this.frameHeader[1];

            this.fin     = Boolean(firstByte  & 0x80);
            this.rsv1    = Boolean(firstByte  & 0x40);
            this.rsv2    = Boolean(firstByte  & 0x20);
            this.rsv3    = Boolean(firstByte  & 0x10);
            this.mask    = Boolean(secondByte & 0x80);

            this.opcode  = firstByte  & 0x0F;
            this.length = secondByte & 0x7F;
            
            // Control frame sanity check
            if (this.opcode >= 0x08) {
                if (this.length > 125) {
                    this.protocolError = true;
                    this.dropReason = "Illegal control frame longer than 125 bytes.";
                    return true;
                }
                if (!this.fin) {
                    this.protocolError = true;
                    this.dropReason = "Control frames must not be fragmented.";
                    return true;
                }
            }
            
            if (this.length === 126) {
                this.parseState = WAITING_FOR_16_BIT_LENGTH;
            }
            else if (this.length === 127) {
                this.parseState = WAITING_FOR_64_BIT_LENGTH;
            }
            else {
                this.parseState = WAITING_FOR_MASK_KEY;
            }
        }
    }
    if (this.parseState === WAITING_FOR_16_BIT_LENGTH) {
        if (bufferList.length >= 2) {
            bufferList.joinInto(this.frameHeader, 2, 0, 2);
            bufferList.advance(2);
            this.length = ctio.ruint16(this.frameHeader, 'big', 2);
            this.parseState = WAITING_FOR_MASK_KEY;
        }
    }
    else if (this.parseState === WAITING_FOR_64_BIT_LENGTH) {
        if (bufferList.length >= 8) {
            bufferList.joinInto(this.frameHeader, 2, 0, 8);
            bufferList.advance(8);
            var lengthPair = ctio.ruint64(this.frameHeader, 'big', 2);
            if (lengthPair[0] !== 0) {
                this.protocolError = true;
                this.dropReason = "Unsupported 64-bit length frame received";
                return true;
            }
            this.length = lengthPair[1];
            this.parseState = WAITING_FOR_MASK_KEY;
        }
    }
    
    if (this.parseState === WAITING_FOR_MASK_KEY) {
        if (this.mask) {
            if (bufferList.length >= 4) {
                bufferList.joinInto(this.maskBytes, 0, 0, 4);
                bufferList.advance(4);
                this.maskPos = 0;
                this.parseState = WAITING_FOR_PAYLOAD;
            }
        }
        else {
            this.parseState = WAITING_FOR_PAYLOAD;
        }
    }
    
    if (this.parseState === WAITING_FOR_PAYLOAD) {
        if (this.length > this.maxReceivedFrameSize) {
            this.frameTooLarge = true;
            this.dropReason = "Frame size of " + this.length.toString(10) +
                              " bytes exceeds maximum accepted frame size";
            return true;
        }
        
        if (this.length === 0) {
            this.binaryPayload = new Buffer(0);
            this.parseState = COMPLETE;
            return true;
        }
        if (bufferList.length >= this.length) {
            this.binaryPayload = bufferList.take(this.length);
            bufferList.advance(this.length);
            if (this.mask) {
                this.maskPos = xor(this.binaryPayload, this.maskBytes, this.maskPos);
            }
            
            if (this.opcode === 0x08) { // WebSocketOpcode.CONNECTION_CLOSE
                if (this.length === 1) {
                    // Invalid length for a close frame.  Must be zero or at least two.
                    this.binaryPayload = new Buffer(0);
                    this.invalidCloseFrameLength = true;
                }
                if (this.length >= 2) {
                    this.closeStatus = ctio.ruint16(this.binaryPayload, 'big', 0);
                    this.binaryPayload = this.binaryPayload.slice(2);
                }
            }
            
            this.parseState = COMPLETE;
            return true;
        }
    }
    return false;
}