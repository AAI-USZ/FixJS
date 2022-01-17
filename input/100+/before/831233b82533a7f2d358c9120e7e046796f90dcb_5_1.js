function (obj) {
			
			if (typeof this.settings.alignment === 'undefined') {
				var config = this.config.alignment;
			} else {
				var config = this.settings.alignment;
			}
			
			if ( jQuery.inArray('right', config) != -1) {
				this.alignRightButton.show();
			} else {
				this.alignRightButton.hide();
			}

			if ( jQuery.inArray('left', config) != -1) {
				this.alignLeftButton.show();
			} else {
				this.alignLeftButton.hide();
			}

			if ( jQuery.inArray('center', config) != -1) {
				this.alignCenterButton.show();
			} else {
				this.alignCenterButton.hide();
			}

			if ( jQuery.inArray('justify', config) != -1) {
				this.alignJustifyButton.show();
			} else {
				this.alignJustifyButton.hide();
			}
		}