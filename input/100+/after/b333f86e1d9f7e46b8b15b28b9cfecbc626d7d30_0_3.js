function () {
		var oldSize = this.getSize();

		this._sizeChanged = true;

		if (this.options.maxBounds) {
			this.setMaxBounds(this.options.maxBounds);
		}

		if (!this._loaded) { return this; }

		var offset = oldSize.subtract(this.getSize()).divideBy(2, true);
		this._rawPanBy(offset);

		this.fire('move');

		clearTimeout(this._sizeTimer);
		this._sizeTimer = setTimeout(L.Util.bind(this.fire, this, 'moveend'), 200);

		return this;
	}