function (editor) {
		/*
		 * Setting up some properties from PageTSConfig
		 */
		this.buttonsConfiguration = this.editorConfiguration.buttons;
		this.useAttribute = {};
		this.useAttribute.lang = (this.buttonsConfiguration.language && this.buttonsConfiguration.language.useLangAttribute) ? this.buttonsConfiguration.language.useLangAttribute : true;
		this.useAttribute.xmlLang = (this.buttonsConfiguration.language && this.buttonsConfiguration.language.useXmlLangAttribute) ? this.buttonsConfiguration.language.useXmlLangAttribute : false;
		if (!this.useAttribute.lang && !this.useAttribute.xmlLang) {
			this.useAttribute.lang = true;
		}

			// Importing list of allowed attributes
		if (this.getPluginInstance('TextStyle')) {
			this.allowedAttributes = this.getPluginInstance('TextStyle').allowedAttributes;
		}			
		if (!this.allowedAttributes && this.getPluginInstance('InlineElements')) {
			this.allowedAttributes = this.getPluginInstance('InlineElements').allowedAttributes;
		}
		if (!this.allowedAttributes && this.getPluginInstance('BlockElements')) {
			this.allowedAttributes = this.getPluginInstance('BlockElements').allowedAttributes;
		}
		if (!this.allowedAttributes) {
			this.allowedAttributes = new Array('id', 'title', 'lang', 'xml:lang', 'dir', 'class');
			if (Ext.isIE) {
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
			sponsor		: this.localize('Technische Universitat Ilmenau'),
			sponsorUrl	: 'http://www.tu-ilmenau.de/',
			license		: 'GPL'
		};
		this.registerPluginInformation(pluginInformation);
		/*
		 * Registering the buttons
		 */
		var buttonList = this.buttonList, buttonId;
		for (var i = 0, n = buttonList.length; i < n; ++i) {
			var button = buttonList[i];
			buttonId = button[0];
			var buttonConfiguration = {
				id		: buttonId,
				tooltip		: this.localize(buttonId + '-Tooltip'),
				iconCls		: 'htmlarea-action-' + button[2],
				action		: 'onButtonPress',
				context		: button[1]
			};
			this.registerButton(buttonConfiguration);
		}
		/*
		 * Registering the dropdown list
		 */
		var buttonId = 'Language';
		if (this.buttonsConfiguration[buttonId.toLowerCase()] && this.buttonsConfiguration[buttonId.toLowerCase()].dataUrl) {
			var dropDownConfiguration = {
				id		: buttonId,
				tooltip		: this.localize(buttonId + '-Tooltip'),
				storeUrl	: this.buttonsConfiguration[buttonId.toLowerCase()].dataUrl,
				action		: 'onChange'
			};
			if (this.buttonsConfiguration.language) {
				dropDownConfiguration.width = this.buttonsConfiguration.language.width ? parseInt(this.buttonsConfiguration.language.width, 10) : 200;
				if (this.buttonsConfiguration.language.listWidth) {
					dropDownConfiguration.listWidth = parseInt(this.buttonsConfiguration.language.listWidth, 10);
				}
				if (this.buttonsConfiguration.language.maxHeight) {
					dropDownConfiguration.maxHeight = parseInt(this.buttonsConfiguration.language.maxHeight, 10);
				}
			}
			this.registerDropDown(dropDownConfiguration);
		}
		return true;
	}