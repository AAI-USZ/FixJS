function() {
            
            if (this.written > this.audio.mozCurrentSampleOffset() + 16384) {
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