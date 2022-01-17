function hide() {
		this.container.innerHTML = '';
		this._removeFloater();
		this.showing = false;
		this._visibleDate = null;
		this.selector = null;

		return this.emit('hide', this);
	}