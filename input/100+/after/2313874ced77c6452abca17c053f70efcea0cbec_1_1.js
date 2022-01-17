function () {
			var that = this;

			// add button to toggle numerated-headers
			this.numeratedHeadersButton = new Aloha.ui.Button({
				'iconClass' : 'aloha-button aloha-button-numerated-headers',
				'size' : 'small',
				'onclick' : function () {
					if (that.numeratedHeadersButton.isPressed()) {
						that.removeNumerations();
					} else {
						that.createNumeratedHeaders();
					}
				},
				'tooltip' : i18n.t('button.numeratedHeaders.tooltip'),
				'toggle' : true /*,
				'pressed' : this.numeratedactive */
			});

			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.numeratedHeadersButton,
				i18nCore.t('floatingmenu.tab.format'),
				1
			);

			// We need to bind to smart-content-changed event to recognize
			// backspace and delete interactions.
			Aloha.bind('aloha-smart-content-changed', function (event) {
				that.cleanNumerations();
				if (that.showNumbers()) {
					that.createNumeratedHeaders();
				}
			});
			
			// We need to listen to that event, when a block is formatted to
			// header format. smart-content-changed would be not fired in 
			// that case
			Aloha.bind('aloha-format-block', function () {
				if (that.showNumbers()) {
					that.createNumeratedHeaders();
				}
			});

			Aloha.bind('aloha-editable-activated', function (event) {
				
				// hide the button, when numerating is off
				if (that.numeratedHeadersButton) {
					if (that.isNumeratingOn()) {
						that.numeratedHeadersButton.show();
						that.initForEditable(Aloha.activeEditable.obj);
					} else {
						that.numeratedHeadersButton.hide();
					}
				}
			});
		}