function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			this._contentNode.innerHTML = '';
			this._contentNode.appendChild(this._content);
		}
		this.fire('contentupdate');
	}