function () {
		if (this.options.useTransition) this._unbind('webkitTransitionEnd');
		else cancelFrame(this.aniTime);
		this.steps = [];
		this.moved = false;
		this.animating = false;
	}