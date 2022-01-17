function(force) {
			this._isAttachedToActiveWin() && (!this._batchUpdateInProgress || force) && UI._triggerLayout(this, force);
		}