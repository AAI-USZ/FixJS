function (editor) {
			// Setting the array of allowed attributes on inline elements
		if (this.getPluginInstance('TextStyle')) {
			this.allowedAttributes = this.getPluginInstance('TextStyle').allowedAttributes;
		} else {
			this.allowedAttributes = new Array('id', 'title', 'lang', 'xml:lang', 'dir', 'class', 'itemscope', 'itemtype', 'itemprop');
			if (Ext.isIE) {
				this.addAllowedAttribute('className');
			}
		}
			// Getting tags configuration for inline elements
		if (this.editorConfiguration.buttons.textstyle) {
			this.tags = this.editorConfiguration.buttons.textstyle.tags;
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
		 * Registering the dropdown list
		 */
		var buttonId = "FormatText";
		var dropDownConfiguration = {
			id		: buttonId,
			tooltip		: this.localize(buttonId + "-Tooltip"),
			options		: (this.editorConfiguration.buttons[buttonId.toLowerCase()] ? this.editorConfiguration.buttons[buttonId.toLowerCase()].options : []),
			action		: "onChange"
		};
		if (this.editorConfiguration.buttons.formattext) {
			if (this.editorConfiguration.buttons.formattext.width) {
				dropDownConfiguration.listWidth = parseInt(this.editorConfiguration.buttons.formattext.width, 10);
			}
			if (this.editorConfiguration.buttons.formattext.listWidth) {
				dropDownConfiguration.listWidth = parseInt(this.editorConfiguration.buttons.formattext.listWidth, 10);
			}
			if (this.editorConfiguration.buttons.formattext.maxHeight) {
				dropDownConfiguration.maxHeight = parseInt(this.editorConfiguration.buttons.formattext.maxHeight, 10);
			}
		}
		this.registerDropDown(dropDownConfiguration);
		
		/*
		 * Registering the buttons
		 */
		var n = this.buttonList.length;
		for (var i = 0; i < n; ++i) {
			var button = this.buttonList[i];
			buttonId = button[0];
			var buttonConfiguration = {
				id		: buttonId,
				tooltip		: this.localize(buttonId + "-Tooltip"),
				contextMenuTitle: this.localize(buttonId + '-contextMenuTitle'),
				helpText	: this.localize(buttonId + '-helpText'),
				action		: "onButtonPress",
				context		: button[1],
				hide		: false,
				selection	: false,
				iconCls		: 'htmlarea-action-' + button[2]
			};
			this.registerButton(buttonConfiguration);
		}
	}