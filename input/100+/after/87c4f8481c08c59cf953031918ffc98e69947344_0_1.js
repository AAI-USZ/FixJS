function() {
            
            var mozCurrentSampleOffset = this.audio.mozCurrentSampleOffset();
            
            // v12.07.23: bugfix for linux (mozCurrentSampleOffset > 0)
            if (mozCurrentSampleOffset > 0 &&
                this.written > mozCurrentSampleOffset + 16384) {
                return this;
            }
            
            var interleaved = this.interleaved;
            this.audio.mozWriteAudio(interleaved);
            sys.process();
            
            var inL = sys.L, inR = sys.R;
            var i = interleaved.length, j = inL.length;
            
            while (j--) {
                interleaved[--i] = inR[j];            
                interleaved[--i] = inL[j];
            }
            this.written += interleaved.length;
        }