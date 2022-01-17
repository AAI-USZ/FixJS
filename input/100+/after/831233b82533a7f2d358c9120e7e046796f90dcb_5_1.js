function (obj) {
			
			var config = this.getEditableConfig(obj);

			if ( config && config.alignment && !this.settings.alignment ) {
				config = config;
			} else if ( config[0] && config[0].alignment) {
				config = config[0];
			} else if ( this.settings.alignment ) {
				config.alignment = this.settings.alignment;
			}

			if (typeof config.alignment === 'undefined') {
				config = this.config;
			}

			if ( jQuery.inArray('right', config.alignment) != -1) {
				this.alignRightButton.show();
			} else {
				this.alignRightButton.hide();
			}

			if ( jQuery.inArray('left', config.alignment) != -1) {
				this.alignLeftButton.show();
			} else {
				this.alignLeftButton.hide();
			}

			if ( jQuery.inArray('center', config.alignment) != -1) {
				this.alignCenterButton.show();
			} else {
				this.alignCenterButton.hide();
			}

			if ( jQuery.inArray('justify', config.alignment) != -1) {
				this.alignJustifyButton.show();
			} else {
				this.alignJustifyButton.hide();
			}
		}