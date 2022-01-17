function(options) {
			// constructor like function.

			// deal with collection first to avoid reference errors with object.clone / merge for setOptions
			if (options && options.collection) {
				this.setCollection(options.collection);
				delete options.collection;
			}

			// deal with model as well
			if (options && options.model) {
				this.setModel(options.model);
				delete options.model;
			}

			// now we can hopefully setOptions safely.
			this.setOptions(options);

			// define the element.
			if (this.options.element) {
				this.setElement(this.options.element, this.options.events);
				delete this.options.element;
			}

			// let the instance know
			return this.fireEvent('ready');
		}