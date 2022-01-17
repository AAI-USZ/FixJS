function (editor) {
		this.buttonsConfiguration = this.editorConfiguration.buttons;
		this.disablePCexamples = this.editorConfiguration.disablePCexamples;
			// Font formating will use the style attribute
		if (this.getPluginInstance('TextStyle')) {
			this.getPluginInstance('TextStyle').addAllowedAttribute('style');
			this.allowedAttributes = this.getPluginInstance('TextStyle').allowedAttributes;
		}
		if (this.getPluginInstance('InlineElements')) {
			this.getPluginInstance('InlineElements').addAllowedAttribute('style');
			if (!this.allowedAllowedAttributes) {
				this.allowedAttributes = this.getPluginInstance('InlineElements').allowedAttributes;
			}
		}
		if (this.getPluginInstance('BlockElements')) {
			this.getPluginInstance('BlockElements').addAllowedAttribute('style');
		}
		if (!this.allowedAttributes) {
			this.allowedAttributes = new Array('id', 'title', 'lang', 'xml:lang', 'dir', 'class', 'style');
			if (HTMLArea.isIEBeforeIE9) {
				this.allowedAttributes.push('className');
			}
		}
		/*
		 * Registering plugin "About" information
		 */
		var pluginInformation = {
			version		: '2.2',
			developer	: 'Stanislas Rolland',
			developerUrl	: 'http://www.sjbr.ca/',
			copyrightOwner	: 'Stanislas Rolland',
			sponsor		: 'SJBR',
			sponsorUrl	: 'http://www.sjbr.ca/',
			license		: 'GPL'
		};
		this.registerPluginInformation(pluginInformation);
		/*
		 * Registering the dropdowns
		 */
		Ext.each(this.dropDownList, function (dropDown) {
			var buttonId = dropDown[0];
			if (this.isButtonInToolbar(buttonId)) {
				var dropDownConfiguration = {
					id: buttonId,
					tooltip: this.localize(buttonId.toLowerCase()),
					storeUrl: this.buttonsConfiguration[dropDown[2]].dataUrl,
					action: 'onChange',
					tpl: this.disablePCexamples ? '' : '<tpl for="."><div ext:qtip="{value}" style="' + dropDown[3] + '" class="x-combo-list-item">{text}</div></tpl>'
				};
				if (this.buttonsConfiguration[dropDown[2]]) {
					if (this.editorConfiguration.buttons[dropDown[2]].width) {
						dropDownConfiguration.width = parseInt(this.editorConfiguration.buttons[dropDown[2]].width, 10);
					}
					if (this.editorConfiguration.buttons[dropDown[2]].listWidth) {
						dropDownConfiguration.listWidth = parseInt(this.editorConfiguration.buttons[dropDown[2]].listWidth, 10);
					}
					if (this.editorConfiguration.buttons[dropDown[2]].maxHeight) {
						dropDownConfiguration.maxHeight = parseInt(this.editorConfiguration.buttons[dropDown[2]].maxHeight, 10);
					}
				}
				this.registerDropDown(dropDownConfiguration);
			}
			return true;
		}, this);
		return true;
	 }