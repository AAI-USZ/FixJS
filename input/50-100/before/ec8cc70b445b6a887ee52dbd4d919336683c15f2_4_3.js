function( attr ) {
			// convert the attr into parts (if nested)
			var parts = attrParts(attr),
				// the actual property to remove
				prop = parts.shift(),
				// the current value
				current = this._data[prop];

			// if we have more parts, call removeAttr on that part
			if ( parts.length ) {
				return current.removeAttr(parts)
			} else {
				// otherwise, delete
				delete this._data[prop];
				// create the event
				if (!(prop in this.constructor.prototype)) {
					delete this[prop]
				}
				trigger(this, "change", [prop, "remove", undefined, current]);
				return current;
			}
		}