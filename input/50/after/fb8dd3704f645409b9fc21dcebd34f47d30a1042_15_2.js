function() {
			var needsRecalculation = this._contentMeasurer.layout === this.layout
			this._contentMeasurer.layout = this.layout;
			return needsRecalculation;
		}