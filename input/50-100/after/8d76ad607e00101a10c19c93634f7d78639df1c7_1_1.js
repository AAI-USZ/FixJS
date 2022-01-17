function (evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (!this._disabled && !zk.animating()) {		
			if (this._open) this.close({focus:true,sendOnOpen:true});
			else this.open(zk.ios ? {focus:false,sendOnOpen:true} : {focus:true,sendOnOpen:true}); // prevent ios native keyboard showed
		}
		evt.stop();
	}