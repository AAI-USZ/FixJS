function () {
			var self = this;

			self.insertButton = new Aloha.ui.Button({
				'name': 'characterpicker',
				'iconClass': 'aloha-button-characterpicker',
				'size': 'small',
				'onclick': function (element, event) {
					self.characterOverlay.show(element.btnEl.dom);
				},
				'tooltip': i18n.t('button.addcharacter.tooltip'),
				'toggle': false
			});
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				self.insertButton,
				i18nCore.t('floatingmenu.tab.insert'),
				1
			);
			self.characterOverlay = new CharacterOverlay(self.onCharacterSelect);

			// when an editable is activated, we get the config for the editable
			Aloha.bind('aloha-editable-activated', function (event, data) {
				var config = self.getEditableConfig(data.editable.obj);

				// make a space separated string out of arrays
				if (jQuery.isArray(config)) {
					config = config.join(' ');
				}

				if (config) {
					self.characterOverlay.setCharacters(config);
					self.insertButton.show();
				} else {
					self.insertButton.hide();
				}
			});
		}