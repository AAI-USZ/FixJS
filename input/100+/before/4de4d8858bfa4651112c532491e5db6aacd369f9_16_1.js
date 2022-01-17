function (editor) {
		this.cssArray = {};
		this.classesUrl = this.editorConfiguration.classesUrl;
		this.pageTSconfiguration = this.editorConfiguration.buttons.textstyle;
		this.tags = (this.pageTSconfiguration && this.pageTSconfiguration.tags) ? this.pageTSconfiguration.tags : {};
		var allowedClasses;
		for (var tagName in this.tags) {
			if (this.tags.hasOwnProperty(tagName)) {
				if (this.tags[tagName].allowedClasses) {
					allowedClasses = this.tags[tagName].allowedClasses.trim().split(",");
					for (var cssClass in allowedClasses) {
						if (allowedClasses.hasOwnProperty(cssClass)) {
							allowedClasses[cssClass] = allowedClasses[cssClass].trim().replace(/\*/g, ".*");
						}
					}
					this.tags[tagName].allowedClasses = new RegExp( "^(" + allowedClasses.join("|") + ")$", "i");
				}
			}
		}
		this.showTagFreeClasses = this.pageTSconfiguration ? this.pageTSconfiguration.showTagFreeClasses : false;
		this.prefixLabelWithClassName = this.pageTSconfiguration ? this.pageTSconfiguration.prefixLabelWithClassName : false;
		this.postfixLabelWithClassName = this.pageTSconfiguration ? this.pageTSconfiguration.postfixLabelWithClassName : false;
		/*
		 * Regular expression to check if an element is an inline elment
		 */
		this.REInlineTags = /^(a|abbr|acronym|b|bdo|big|cite|code|del|dfn|em|i|img|ins|kbd|q|samp|small|span|strike|strong|sub|sup|tt|u|var)$/;
		
			// Allowed attributes on inline elements
		this.allowedAttributes = new Array('id', 'title', 'lang', 'xml:lang', 'dir', 'class', 'itemscope', 'itemtype', 'itemprop');
		if (Ext.isIE) {
			this.addAllowedAttribute('className');
		}
		/*
		 * Registering plugin "About" information
		 */
		var pluginInformation = {
			version		: '2.3',
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
		var buttonId = 'TextStyle';
		var fieldLabel = this.pageTSconfiguration ? this.pageTSconfiguration.fieldLabel : '';
		if (Ext.isEmpty(fieldLabel) && this.isButtonInToolbar('I[text_style]')) {
			fieldLabel = this.localize('text_style');
		}
		var dropDownConfiguration = {
			id: buttonId,
			tooltip: this.localize(buttonId + '-Tooltip'),
			fieldLabel: fieldLabel,
			options: [[this.localize('No style'), 'none']],
			action: 'onChange',
			storeFields: [ { name: 'text'}, { name: 'value'}, { name: 'style'} ],
			tpl: '<tpl for="."><div ext:qtip="{value}" style="{style}text-align:left;font-size:11px;" class="x-combo-list-item">{text}</div></tpl>'
		};
		if (this.pageTSconfiguration) {
			if (this.pageTSconfiguration.width) {
				dropDownConfiguration.width = parseInt(this.pageTSconfiguration.width, 10);
			}
			if (this.pageTSconfiguration.listWidth) {
				dropDownConfiguration.listWidth = parseInt(this.pageTSconfiguration.listWidth, 10);
			}
			if (this.pageTSconfiguration.maxHeight) {
				dropDownConfiguration.maxHeight = parseInt(this.pageTSconfiguration.maxHeight, 10);
			}
		}
		this.registerDropDown(dropDownConfiguration);
		return true;
	}