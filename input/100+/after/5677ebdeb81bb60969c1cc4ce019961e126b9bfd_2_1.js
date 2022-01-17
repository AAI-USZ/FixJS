function (desktop, skipper, after) {
		this.$supers(Listbox, 'bind_', arguments); //it might invoke replaceHTML and then call bind_ again
		this._shallStripe = true;
		var w = this;
		after.push(function () {
			w.stripe();
			_syncFrozen(w);
			_fixForEmpty(w);
		});
		this._shallScrollIntoView = true;
		
		// Bug in B50-ZK-273.zul
		if (zk.ie6_ && this.getSelectedIndex() > -1)
			zk(this).redoCSS();
	}