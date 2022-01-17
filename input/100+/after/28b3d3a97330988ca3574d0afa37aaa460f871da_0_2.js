function(){
			ContentHandlerManager.register( 'formatless', FormatlessPasteHandler );
			FormatlessPasteHandler.strippedElements = this.strippedElements;
			// add button to toggle format-less pasting
			this.formatlessPasteButton = new Aloha.ui.Button({
					'iconClass' : 'aloha-button aloha-button-formatless-paste',
					'size' : 'small',
					'onclick' : function () { 
						//toggle the value of allowFormatless
						FormatlessPasteHandler.enabled = !FormatlessPasteHandler.enabled;
					},
					'tooltip' : i18n.t( 'button.formatlessPaste.tooltip' ),
					'toggle' : true
				});
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.formatlessPasteButton,
				i18nCore.t( 'floatingmenu.tab.format' ),
				1
			);
			
			// activate formatless paste button if option is set
			if (this.formatlessPasteOption === true) {
				this.formatlessPasteButton.setPressed(true);
				FormatlessPasteHandler.enabled = true;
			}
			
			// hide button by default if configured
			if (this.button === false) {
				this.formatlessPasteButton.hide();
			}
		}