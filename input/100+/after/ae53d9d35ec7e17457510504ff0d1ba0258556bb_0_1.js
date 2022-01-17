function (el, options) {
			// a cache of elements.
			this.$ = {
				table : $(el)
			}

			// the area that scrolls
			this.$.scrollBody = this.$.table.wrap('<div><div ><div></div></div></div>').parent();
			// a div that houses the scrollable area.  IE < 8 needs this.  It acts
			// as a buffer for the scroll bar
			this.$.body = this.$.scrollBody.parent();

			can.Control.prototype.setup.call(this, this.$.body.parent()[0], options);
			// We have to add the control to the original table element as well
			(arr = can.data(this.$.table,"controls")) || can.data(this.$.table,"controls",arr = []);
			arr.push(this);
		}