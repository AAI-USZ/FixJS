function(prop, value, current){
			// otherwise, we are setting it on this object
			// todo: check if value is object and transform
			// are we changing the value
			if ( value !== current ) {

				// check if we are adding this for the first time
				// if we are, we need to create an 'add' event
				var changeType = this.__get().hasOwnProperty(prop) ? "set" : "add";

				// set the value on data
				this.___set(prop,
				// if we are getting an object
				canMakeObserve(value) ?
				// hook it up to send event to us
				hookupBubble(value, prop, this) :
				// value is normal
				value);



				// batchTrigger the change event
				batchTrigger(this, "change", [prop, changeType, value, current]);
				batchTrigger(this, prop, value, current);
				// if we can stop listening to our old value, do it
				current && unhookup([current], this._namespace);
			}

		}