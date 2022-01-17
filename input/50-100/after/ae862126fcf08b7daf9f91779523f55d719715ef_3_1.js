function (evt) {
		if (this.inRoundedMold() && !this._buttonVisible) return;
		if (!this._disabled && !zk.animating()) {		
			if (this._open) this.close({focus:true,sendOnOpen:true});
			else this.open({focus: zul.inp.InputCtrl.isPreservedFocus(this),sendOnOpen:true});	
		}
		evt.stop();
	}