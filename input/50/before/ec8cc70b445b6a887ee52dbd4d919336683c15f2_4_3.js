function( obj ) {
			// _data is where we keep the properties
			this._data = {};
			// the namespace this object uses to listen to events
			this._namespace = ".observe" + (++id);
			// sets all attrs
			this._init = 1;
			this.attr(obj);
			delete this._init;
		}