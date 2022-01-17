function(value) {
			this.$.rotation = value;

			// Update transform property
			transformValue[1] = value;
			setPrefixedProperty(this.domElement.style, 'transform', transformValue.join(''));
		}