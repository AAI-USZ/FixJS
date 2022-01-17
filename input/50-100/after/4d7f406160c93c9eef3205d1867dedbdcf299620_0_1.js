function(time,callback)
{
    //if popcornPlayer is defined then player type is in the list ['video','audio','image','text']
    if(this.popcornPlayer) {
		if (time == 'begin') {
			$(this.htmlPlayer).on('play',callback);
		} else if (time == 'end') {
			// The player already defines a call back function for the 'ended' popcorn event,
			// which is the 'this.onEnded()' method, so we can't define another callback for
			// the same event.
			this.onEndedExec = callback;
		} else {
			this.popcornPlayer.cue(time,callback);
		}
	}
}