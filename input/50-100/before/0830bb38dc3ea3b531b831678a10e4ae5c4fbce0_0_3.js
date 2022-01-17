function () {
		var container = this._container,
			stroke,
			fill;

		if (this.options.stroke) {
			stroke = this._stroke = this._createElement('stroke');
			stroke.endcap = 'round';
			container.appendChild(stroke);
		}

		if (this.options.fill) {
			fill = this._fill = this._createElement('fill');
			container.appendChild(fill);
		}

		this._updateStyle();
	}