function( props, remove ) {
			if ( props === undefined ) {
				return serialize(this, 'attr', []);
			}

			// Create a copy.
			props = props.slice(0);

			var len = Math.min(props.length, this.length),
				collectingStarted = collect(),
				prop;

			for ( var prop = 0; prop < len; prop++ ) {
				var curVal = this[prop],
					newVal = props[prop];

				if ( canMakeObserve(curVal) && canMakeObserve(newVal) ) {
					curVal.attr(newVal, remove)
				} else if ( curVal != newVal ) {
					this._set(prop, newVal)
				} else {

				}
			}
			if ( props.length > this.length ) {
				// Add in the remaining props.
				this.push(props.slice(this.length))
			} else if ( props.length < this.length && remove ) {
				this.splice(props.length)
			}

			if ( collectingStarted ) {
				sendCollection()
			}
		}