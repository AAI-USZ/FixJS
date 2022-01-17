function () {
			onDragStart.call(this);
			onDragEnd.call(this);
			this._poly.fire('edit');
		}