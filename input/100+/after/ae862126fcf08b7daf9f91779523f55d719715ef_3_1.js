function (evt) {
		if (!this._disabled) {
			if (evt.domTarget == this.getPopupNode_())
				this.close({
					focus: zul.inp.InputCtrl.isPreservedFocus(this),
					sendOnOpen: true
				});
			else if (this._readonly && !this.isOpen() && this._buttonVisible)
				this.open({
					focus: zul.inp.InputCtrl.isPreservedFocus(this),
					sendOnOpen: true
				});
			this.$supers('doClick_', arguments);
		}
	}