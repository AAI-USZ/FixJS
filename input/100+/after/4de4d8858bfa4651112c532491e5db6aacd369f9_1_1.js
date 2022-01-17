function (editor) {
		/*
		 * Setting up some properties from PageTSConfig
		 */
		this.buttonsConfiguration = this.editorConfiguration.buttons;
		if (this.buttonsConfiguration.blockstyle) {
			this.tags = this.editorConfiguration.buttons.blockstyle.tags;
		}
		this.useClass = {
			Indent		: "indent",
			JustifyLeft	: "align-left",
			JustifyCenter	: "align-center",
			JustifyRight	: "align-right",
			JustifyFull	: "align-justify"
		};
		this.useAlignAttribute = false;
		for (var buttonId in this.useClass) {
			if (this.useClass.hasOwnProperty(buttonId)) {
				if (this.editorConfiguration.buttons[this.buttonList[buttonId][2]]) {
					this.useClass[buttonId] = this.editorConfiguration.buttons[this.buttonList[buttonId][2]].useClass ? this.editorConfiguration.buttons[this.buttonList[buttonId][2]].useClass : this.useClass[buttonId];
					if (buttonId === "Indent") {
						this.useBlockquote = this.editorConfiguration.buttons.indent.useBlockquote ? this.editorConfiguration.buttons.indent.useBlockquote : false;
					} else {
						if (this.editorConfiguration.buttons[this.buttonList[buttonId][2]].useAlignAttribute) {
							this.useAlignAttribute = true;
						}
					}
				}
			}
		}
		this.allowedAttributes = new Array('id', 'title', 'lang', 'xml:lang', 'dir', 'class', 'itemscope', 'itemtype', 'itemprop');
		if (HTMLArea.isIEBeforeIE9) {
			this.addAllowedAttribute('className');
		}
		this.indentedList = null;
			// Standard block formating items
		var standardElements = new Array('address', 'article', 'aside', 'blockquote', 'div', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'nav', 'p', 'pre', 'section');
		this.standardBlockElements = new RegExp( '^(' + standardElements.join('|') + ')$', 'i');
			// Process block formating customization configuration
		this.formatBlockItems = {};
		if (this.buttonsConfiguration
			&& this.buttonsConfiguration.formatblock
			&& this.buttonsConfiguration.formatblock.items) {
				this.formatBlockItems = this.buttonsConfiguration.formatblock.items;
		}
			// Build lists of mutually exclusive class names
		for (var tagName in this.formatBlockItems) {
			if (this.formatBlockItems.hasOwnProperty(tagName) && this.formatBlockItems[tagName].tagName && this.formatBlockItems[tagName].addClass) {
				if (!this.formatBlockItems[this.formatBlockItems[tagName].tagName]) {
					this.formatBlockItems[this.formatBlockItems[tagName].tagName] = {};
				}
				if (!this.formatBlockItems[this.formatBlockItems[tagName].tagName].classList) {
					this.formatBlockItems[this.formatBlockItems[tagName].tagName].classList = new Array();
				}
				this.formatBlockItems[this.formatBlockItems[tagName].tagName].classList.push(this.formatBlockItems[tagName].addClass);
			}
		}
		for (var tagName in this.formatBlockItems) {
			if (this.formatBlockItems.hasOwnProperty(tagName) && this.formatBlockItems[tagName].classList) {
				this.formatBlockItems[tagName].classList = new RegExp( "^(" + this.formatBlockItems[tagName].classList.join("|") + ")$");
			}
		}
		/*
		 * Registering plugin "About" information
		 */
		var pluginInformation = {
			version		: '3.0',
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
		var buttonId = "FormatBlock";
		var dropDownConfiguration = {
			id: buttonId,
			tooltip: this.localize(buttonId + "-Tooltip"),
			options: this.buttonsConfiguration.formatblock ? this.buttonsConfiguration.formatblock.options : [],
			action: "onChange"
		};
		if (this.buttonsConfiguration.formatblock) {
			dropDownConfiguration.width = this.buttonsConfiguration.formatblock.width ? parseInt(this.buttonsConfiguration.formatblock.width, 10) : 200;
			if (this.buttonsConfiguration.formatblock.listWidth) {
				dropDownConfiguration.listWidth = parseInt(this.buttonsConfiguration.formatblock.listWidth, 10);
			}
			if (this.buttonsConfiguration.formatblock.maxHeight) {
				dropDownConfiguration.maxHeight = parseInt(this.buttonsConfiguration.formatblock.maxHeight, 10);
			}
		}
		this.registerDropDown(dropDownConfiguration);
		/*
		 * Establishing the list of allowed block elements
		 */
		var blockElements = new Array();
		Ext.each(dropDownConfiguration.options, function (option) {
			if (option[1] != 'none') {
				blockElements.push(option[1]);
			}
		});
		if (blockElements.length) {
			this.allowedBlockElements = new RegExp( "^(" + blockElements.join("|") + ")$", "i");
		} else {
			this.allowedBlockElements = this.standardBlockElements;
		}
		/*
		 * Registering hot keys for the dropdown list items
		 */
		Ext.each(blockElements, function (blockElement) {
			var configuredHotKey = this.defaultHotKeys[blockElement];
			if (this.editorConfiguration.buttons.formatblock
					&& this.editorConfiguration.buttons.formatblock.items
					&& this.editorConfiguration.buttons.formatblock.items[blockElement]
					&& this.editorConfiguration.buttons.formatblock.items[blockElement].hotKey) {
				configuredHotKey = this.editorConfiguration.buttons.formatblock.items[blockElement].hotKey;
			}
			if (configuredHotKey) {
				var hotKeyConfiguration = {
					id		: configuredHotKey,
					cmd		: buttonId,
					element		: blockElement
				};
				this.registerHotKey(hotKeyConfiguration);
			}
		}, this);
		/*
		 * Registering the buttons
		 */
		for (var buttonId in this.buttonList) {
			if (this.buttonList.hasOwnProperty(buttonId)) {
				var button = this.buttonList[buttonId];
				var buttonConfiguration = {
					id		: buttonId,
					tooltip		: this.localize(buttonId + '-Tooltip'),
					iconCls		: 'htmlarea-action-' + button[3],
					contextMenuTitle: this.localize(buttonId + '-contextMenuTitle'),
					helpText	: this.localize(buttonId + '-helpText'),
					action		: 'onButtonPress',
					hotKey		: ((this.buttonsConfiguration[button[2]] && this.buttonsConfiguration[button[2]].hotKey) ? this.buttonsConfiguration[button[2]].hotKey : (button[1] ? button[1] : null))
				};
				this.registerButton(buttonConfiguration);
			}
		}
		return true;
	}