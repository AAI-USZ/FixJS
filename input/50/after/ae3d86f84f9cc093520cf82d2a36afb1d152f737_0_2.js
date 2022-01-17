function onTouchPause () {
	$(this).data( 'touchPauseFlag', true );
	this.cyclePause++;
	triggerPause(this, true);
}