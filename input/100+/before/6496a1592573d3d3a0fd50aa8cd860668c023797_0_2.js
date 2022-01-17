function() {
        var pattern = undefined;

        for (var pat = 0; pat < this.patternCount; pat++) {
            this.patterns[pat] = [];
            console.log("[decoder] patterns[" + pat + "][0..64] @ " + this.stream.offset);
            for (var row = 0; row < 64; row++) {
                this.patterns[pat][row] = [];

                for (var chan = 0; chan < this.channelCount; chan++) {
                    b0 = this.stream.readUInt8();
                    b1 = this.stream.readUInt8();
                    b2 = this.stream.readUInt8();
                    b3 = this.stream.readUInt8();
                    var eff = b2 & 0x0f;
                    this.patterns[pat][row][chan] = {
                        sample: (b0 & 0xf0) | (b2 >> 4),
                        period: ((b0 & 0x0f) << 8) | b1,
                        effect: eff,
                        effectParameter: b3
                    };

                    if (eff == 0x0E) {
                        this.patterns[pat][row][chan].extEffect = (b3 & 0xF0) >> 4;
                        this.patterns[pat][row][chan].extEffectParameter = (b3 & 0x0F);
                    }
                }
            }
        }
    }