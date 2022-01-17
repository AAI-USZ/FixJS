function(curVal, prop){
				newVal = props[prop];

				// If we are merging...
				if ( newVal === undefined ) {
					remove && self.removeAttr(prop);
					return;
				}
				if ( canMakeObserve(curVal) && canMakeObserve(newVal) && curVal.attr ) {
					curVal.attr(newVal, remove)
				} else if ( curVal != newVal ) {
					self._set(prop, newVal)
				} else {

				}
				delete props[prop];
			}