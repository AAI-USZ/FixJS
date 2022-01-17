function (evt) {
		if (!this._disabled) {
			this._doMouseOut();

			var cb = this.parent;
			cb._select(this, {sendOnSelect:true, sendOnChange: true});
			this._updateHoverImage();
			cb.close({sendOnOpen:true});
			
			// Fixed the onFocus event is triggered too late in IE.
			cb._shallClose = true;
			zk(cb.getInputNode()).focus();
			evt.stop();
		}
	}