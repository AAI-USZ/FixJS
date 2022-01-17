function( index, count ) {
			var args = Can.makeArray(arguments),
				i;

			for ( i = 2; i < args.length; i++ ) {
				var val = args[i];
				if ( isObject(val) ) {
					args[i] = hookup(val, "*", this)
				}
			}
			if ( count === undefined ) {
				count = args[1] = this.length - index;
			}
			var removed = splice.apply(this, args);
			if ( count > 0 ) {
				trigger(this, "change", [""+index, "remove", undefined, removed]);
				unhookup(removed, this._namespace);
			}
			if ( args.length > 2 ) {
				trigger(this, "change", [""+index, "add", args.slice(2), removed]);
			}
			return removed;
		}