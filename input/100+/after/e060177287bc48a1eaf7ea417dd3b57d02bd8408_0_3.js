function (nodeInterface) {
	if (!this.isStopped) {
        this.presentation.focusManager.disableKeys(this.htmlPlayer);
		if(this.node.descriptor){
			this.presentation.focusManager.removeMedia(this.node.descriptor.focusIndex,this.htmlPlayer);
		}
		this.isPlaying = false;
		this.isStopped = true;
		this.hide();
		if (this.checkType(["video","audio","image","text"])) {
			this.popcornPlayer.pause(0);
		}
		$(this.htmlPlayer).trigger("presentation.onEnd",[nodeInterface]);
	}
}