function(prop, curVal){
				var newVal = props[prop];

				// if we are merging ...
				if ( newVal === undefined ) {
					remove && self.removeAttr(prop);
					return;
				}
				if ( isObject(curVal) && isObject(newVal) ) {
					curVal.attr(newVal, remove)
				} else if ( curVal != newVal ) {
					self._set(prop, newVal)
				} else {

				}
				delete props[prop];
			}