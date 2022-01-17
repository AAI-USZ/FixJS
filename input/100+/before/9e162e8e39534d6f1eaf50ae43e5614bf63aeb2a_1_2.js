function() {
    var now = audioContext.currentTime;

    if (this.isPlaying) {
        //stop playing and return
        var playback = this.sourceNode.playbackRate;
        playback.cancelScheduledValues( now );
        playback.setValueAtTime( playback.value, now );
        playback.setTargetValueAtTime( 0.001, now+0.001, .3 );
        this.sourceNode.noteOff( now + 2 );
        this.sourceNode = null;
        this.isPlaying = false;
        return "play";
    }

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = this.buffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.setValueAtTime( 0.001, now );
    sourceNode.playbackRate.setTargetValueAtTime( 1.0, now+0.001, .3 );
    this.currentPlaybackRate = 1.0;

    sourceNode.connect( audioContext.destination );

    sourceNode.noteOn( now );
    this.sourceNode = sourceNode;
    this.isPlaying = true;
    return "stop";
}