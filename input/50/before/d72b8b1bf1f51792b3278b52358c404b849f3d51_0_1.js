function(value) {
			this.$.scaleX = value;

			// Update transform property
			transformValue[3] = value;
			setPrefixedProperty(this.domElement.style, 'transform', transformValue.join(''));
		}