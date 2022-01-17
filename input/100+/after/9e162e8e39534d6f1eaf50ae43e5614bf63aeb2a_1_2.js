function() {
    var now = audioContext.currentTime;

    if (this.isPlaying) {
        //stop playing and return
        if (this.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
	        var playback = this.sourceNode.playbackRate;
	        playback.cancelScheduledValues( now );
	        playback.setValueAtTime( playback.value, now );
	        playback.setTargetValueAtTime( 0.001, now+0.001, .3 );
	        this.gainNode.gain.setTargetValueAtTime( 0, now+1, 0.01 );
 		   	this.sourceNode.noteOff( now + 2 );
	        this.sourceNode = null;
	        this.gainNode = null;
        }
        this.isPlaying = false;
        return "play";
    }

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = this.buffer;
    sourceNode.loop = false;
    sourceNode.playbackRate.setValueAtTime( 0.001, now );
    sourceNode.playbackRate.linearRampToValueAtTime( 1.0, now+1 );
    this.currentPlaybackRate = 1.0;

	this.gainNode = audioContext.createGainNode();
	this.gainNode.connect( audioContext.destination );
    sourceNode.connect( this.gainNode );

    sourceNode.noteOn( now );
    this.sourceNode = sourceNode;
    this.isPlaying = true;
    this.lastTimeStamp = now + 0.5;		// the 0.5 is to make up for the initial "spin-up" ramp.
    this.lastBufferTime = 0;
    this.lastPBR = 1.0;
    return "stop";
}