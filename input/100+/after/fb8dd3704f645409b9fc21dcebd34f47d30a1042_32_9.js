function(value, oldValue) {
			(value === null || (!is(value,"String") && !is(value,"Number"))) && (value = void 0);
			if (value !== oldValue) {
				!this._batchUpdateInProgress && this._triggerLayout();
			}
			return value;
		}