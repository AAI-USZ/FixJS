function() {
        this.rate = 44100; // This was hard-coded in jsmodplayer, too.

        this.samples = [];
        this.sampleData = [];
        this.positions = [];
        this.patternCount = 0;
        this.patterns = [];
        this.channelCount = 0;
        this.title = undefined;

        /* timing calculations */
        this.ticksPerSecond = 7093789.2; /* PAL frequency */
        this.ticksPerFrame; /* calculated by setBpm */
        this.ticksPerOutputSample = Math.round(this.ticksPerSecond / this.rate);
        this.ticksSinceStartOfFrame = 0;

        /* initial player state */
        this.framesPerRow = 6;
        this.currentFrame = 0;
        this.currentPattern = undefined;
        this.currentPosition = undefined;
        this.currentRow = undefined;
        this.exLoop = false;        //whether E6x looping is currently set
        this.exLoopStart = 0;    //loop point set up by E60
        this.exLoopEnd = 0;        //end of loop (where we hit a E6x cmd) for accurate counting
        this.exLoopCount = 0;    //loops remaining
        this.doBreak = false;    //Bxx, Dxx - jump to order and pattern break
        this.breakPos = 0;
        this.breakRow = 0;
        this.delayRows = false; //EEx pattern delay.

        this.channels = [];

        this.bufferSeconds = 1.5;
        this.bufferLength = this.rate * 2 * this.bufferSeconds;

        this.floatingPoint = true;
    }