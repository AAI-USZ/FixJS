function() {
			this._contentMeasurer.layout = this.layout;
			return View.prototype._doLayout.apply(this,arguments);
		}