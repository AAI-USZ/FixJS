function () {
		this._x = this._subject.x;
		this._y = this._subject.y;

		if (this._x < (width / 2)) {
			this._x = width / 2;
		}
		if (this._y < (height / 2)) {
			this._y = height / 2;
		}
		if (this._x > (this._world.getWidth() - width / 2)) {
			this._x = this._world.getWidth() - width / 2;
		}
		if (this._y < (this._world.getHeight() - height / 2)) {
			this_y = this._world.getHeight() - height / 2;
		}
	}