function (obj) {

				var config = this.getEditableConfig(obj),
					button, i, len;

				if ( typeof config === 'object' ) {
					var config_old = [];
					jQuery.each(config, function(j, button) {
						//window.console.log('zzz check', j, button);
						if ( typeof j === 'number' && typeof button === 'string' ) {
							//config_old.push(j);
						} else {
							config_old.push(j);
						}
					});
				
					if ( config_old.length > 0 ) {
						config = config_old;
					}
				}
				this.formatOptions = config;

				// now iterate all buttons and show/hide them according to the config
				for ( button in this.buttons) {
					if (jQuery.inArray(button, config) != -1) {
						ComponentState.setState(this.buttons[button].type, 'show', true);
					} else {
						ComponentState.setState(this.buttons[button].type, 'show', false);
					}
				}

				// and the same for multisplit items
				len = this.multiSplitItems.length;
				for (i = 0; i < len; i++) {
					if (jQuery.inArray(this.multiSplitItems[i].name, config) != -1) {
						this.multiSplitButton.showItem(this.multiSplitItems[i].name);
					} else {
						this.multiSplitButton.hideItem(this.multiSplitItems[i].name);
					}
				}
			}