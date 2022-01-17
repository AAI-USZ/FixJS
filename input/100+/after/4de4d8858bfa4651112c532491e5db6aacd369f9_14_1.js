function (editor) {
		this.buttonsConfiguration = this.editorConfiguration.buttons;
		this.colorsConfiguration = this.editorConfiguration.colors;
		this.disableColorPicker = this.editorConfiguration.disableColorPicker;
			// Coloring will use the style attribute
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
			version		: '4.3',
			developer	: 'Stanislas Rolland',
			developerUrl	: 'http://www.sjbr.ca/',
			copyrightOwner	: 'Stanislas Rolland',
			sponsor		: 'SJBR',
			sponsorUrl	: 'http://www.sjbr.ca/',
			license		: 'GPL'
		};
		this.registerPluginInformation(pluginInformation);
		/*
		 * Registering the buttons
		 */
		var buttonList = this.buttonList, buttonId;
		for (var i = 0; i < buttonList.length; ++i) {
			var button = buttonList[i];
			buttonId = button[0];
			var buttonConfiguration = {
				id		: buttonId,
				tooltip		: this.localize(buttonId),
				iconCls		: 'htmlarea-action-' + button[2],
				action		: 'onButtonPress',
				hotKey		: (this.buttonsConfiguration[button[1]] ? this.buttonsConfiguration[button[1]].hotKey : null),
				dialog		: true
			};
			this.registerButton(buttonConfiguration);
		}
		return true;
	 }