function () {
		var stroke = this._stroke,
			fill = this._fill,
			options = this.options,
			container = this._container;

		container.stroked = options.stroke;
		container.filled = options.fill;

		if (options.stroke) {
			stroke.weight  = options.weight + 'px';
			stroke.color   = options.color;
			stroke.opacity = options.opacity;
		}

		if (options.fill) {
			fill.color   = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;
		}
	}