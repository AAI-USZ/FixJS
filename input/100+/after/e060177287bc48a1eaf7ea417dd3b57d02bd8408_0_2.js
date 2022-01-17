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
		if (this.checkType(["video","audio","image","text"])) {
            if(this.checkType(["video","audio"]))
			    this.parentContext.syncPlayer(this);

            this.popcornPlayer.play();
			if (nodeInterface && this.area[nodeInterface]._type=="area") {
				if (this.area[this.area[nodeInterface].id].begin) {
                    this.area[this.area[nodeInterface].id].started = true;
					this.seek(this.area[this.area[nodeInterface].id].beginTime);
					$(this.htmlPlayer).one("seeked",$.proxy(function() {
						this.parentContext.notify(this);
						//TODO: Quando for resolvida a sincronização, remover esse play.
						this.popcornPlayer.play();
					},this));
				} else {
					// TODO (frames)
				}
			} else {
				this.parentContext.notify(this);
			}
		}
		$(this.htmlPlayer).trigger("presentation.onBegin",[nodeInterface]);
	}
}