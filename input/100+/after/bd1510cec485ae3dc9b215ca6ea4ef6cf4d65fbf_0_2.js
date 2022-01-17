function (el, options) {
		this._el = el;
		L.Util.extend(this.options, options);

		this._easing = L.Transition.EASINGS[this.options.easing] || L.Transition.EASINGS['ease-out'];

		this._step = L.Util.bind(this._step, this);
		this._interval = Math.round(1000 / this.options.fps);
	}