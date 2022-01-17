function (nodeInterface) {
// (danilo): Sugiro que quando o start for dado,
// caso o player esteja tocando ele seja parado
// e iniciado do lugar onde foi pedido (A maquina virtual
// comporta-se assim no caso de ancoras), nao sei se eh o funcionamento oficial
	if (this.isStopped) {
        this.presentation.focusManager.enableKeys(this.htmlPlayer);
		if(this.node.descriptor){
			this.presentation.focusManager.addMedia(this.node.descriptor.focusIndex,this.htmlPlayer);
		}
		this.isPlaying = true;
		this.isStopped = false;
		this.show();

		if(this.player.start)
			this.player.start();
		else
			Debugger.error(Debugger.ERR_MEDIAPLAYER_METHOD_NOTFOUND,this.playerName,['start',nodeInterface]);
			
		if (nodeInterface) {
			if (this.area[nodeInterface]._type=="area") {
				this.area[this.area[nodeInterface].id].started = true;
				this.seek(this.area[this.area[nodeInterface].id].beginTime);
			} else {
				// TODO (frames)
			}
		}
			
		$(this.htmlPlayer).trigger("presentation.onBegin",[nodeInterface]);
	}
}