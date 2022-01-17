function(value) {
			this.$.scaleY = value;

			// Update transform property
			transformValue[5] = value;
			setPrefixedProperty(this.domElement.style, 'transform', transformValue.join(''));
		}