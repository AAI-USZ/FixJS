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

			// Populate the cache lazily
			setTimeout(function(){ initCache(0); }, 100);
			function initCache(i) {
				if (i < Aloha.editables.length) {
					self.getOverlayForEditable(Aloha.editables[i]);
					setTimeout(function(){ initCache(i + 1); }, 100);
				}
			}

			Aloha.bind('aloha-editable-activated', function (event, data) {
				self.characterOverlay = self.getOverlayForEditable(data.editable);
				if (self.characterOverlay) {
					self.insertButton.show();
				} else {
					self.insertButton.hide();
				}
			});
		}