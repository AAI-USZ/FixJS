function( attr, value ) {
			// convert attr to attr parts (if it isn't already)
			var parts = attrParts(attr),
				// the immediate prop we are setting
				prop = parts.shift(),
				// its current value
				current = this.__get(prop);

			// if we have an object and remaining parts
			if ( canMakeObserve(current) && parts.length ) {
				// that object should set it (this might need to call attr)
				current._set(parts, value)
			} else if (!parts.length ) {
				// we're in 'real' set territory
				
				this.__set(prop, value, current)
				
			} else {
				throw "Can.Observe: set a property on an object that does not exist"
			}
		}