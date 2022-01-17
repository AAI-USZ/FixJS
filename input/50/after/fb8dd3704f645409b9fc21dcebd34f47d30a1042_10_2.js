function() {
			this._title.text = (this._windows[this._windows.length-1]._getTitle()) || (this._tab && this._tab._getTitle()) || "";
		}