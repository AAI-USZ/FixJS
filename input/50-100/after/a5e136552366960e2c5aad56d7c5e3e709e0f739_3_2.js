function (evt) {
		if (!this._disabled) {
			if (evt.domTarget == this.getPopupNode_())
				this.close({
					focus: !zk.mobile,
					sendOnOpen: true
				});
			else if (this._readonly && !this.isOpen() && this._buttonVisible)
				this.open({
					focus: !zk.mobile,
					sendOnOpen: true
				});
			this.$supers('doClick_', arguments);
		}
	}