function() {
			
			var args = getArgs(arguments),
				len = where && this.length ? this.length - 1 : 0;


			var res = [][name].apply(this, args)

			// create a change where the args are
			// "*" - change on potentially multiple properties
			// "remove" - items removed
			// undefined - the new values (there are none)
			// res - the old, removed values (should these be unbound)
			// len - where these items were removed
			trigger(this, "change", [""+len, "remove", undefined, [res]])

			if ( res && res.unbind ) {
				res.unbind("change" + this._namespace)
			}
			return res;
		}