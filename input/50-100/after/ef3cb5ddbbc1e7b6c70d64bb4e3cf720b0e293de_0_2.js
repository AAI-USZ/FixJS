function(parent, mml) {
            this.parent = parent;
            this.mml = mml;
            
            this.octave   = 4;   // (0 .. 9)
            this.length   = 4;   // (1 .. 1920)
            this.dot      = 0;   // (0 .. 3)
            this.detune   = 0;   // (-8192 .. 8191)
            this.quantize = 6;   // (0 .. 8)
            this.volume   = 8;   // (0 .. 128)
            
            this.compile(mml);
        }