function (editor) {
		this.cssArray = {};
		this.classesUrl = this.editorConfiguration.classesUrl;
		this.pageTSconfiguration = this.editorConfiguration.buttons.blockstyle;
		this.tags = (this.pageTSconfiguration && this.pageTSconfiguration.tags) ? this.pageTSconfiguration.tags : {};
			// classesTag is DEPRECATED as of TYPO3 4.6 and will be removed#in TYPO3 4.8
		if (typeof(this.editorConfiguration.classesTag) !== "undefined") {
			if (this.editorConfiguration.classesTag.div) {
				if (!this.tags.div) {
					this.tags.div = new Object();
				}
				if (!this.tags.div.allowedClasses) {
					this.tags.div.allowedClasses = this.editorConfiguration.classesTag.div;
				}
			}
			if (this.editorConfiguration.classesTag.td) {
				if (!this.tags.td) {
					this.tags.td = new Object();
				}
				if (!this.tags.td.allowedClasses) {
					this.tags.td.allowedClasses = this.editorConfiguration.classesTag.td;
				}
			}
			if (this.editorConfiguration.classesTag.table) {
				if (!this.tags.table) {
					this.tags.table = new Object();
				}
				if (!this.tags.table.allowedClasses) {
					this.tags.table.allowedClasses = this.editorConfiguration.classesTag.table;
				}
			}
		}
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
			// Property this.editorConfiguration.showTagFreeClasses is deprecated as of TYPO3 4.6 and will be removed in TYPO3 4.8
		this.showTagFreeClasses = (this.pageTSconfiguration ? this.pageTSconfiguration.showTagFreeClasses : false) || this.editorConfiguration.showTagFreeClasses;
		this.prefixLabelWithClassName = this.pageTSconfiguration ? this.pageTSconfiguration.prefixLabelWithClassName : false;
		this.postfixLabelWithClassName = this.pageTSconfiguration ? this.pageTSconfiguration.postfixLabelWithClassName : false;
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
		 * Registering the drop-down list
		 */
		var dropDownId = 'BlockStyle';
		var fieldLabel = this.pageTSconfiguration ? this.pageTSconfiguration.fieldLabel : '';
		if (Ext.isEmpty(fieldLabel) && this.isButtonInToolbar('I[Block style label]')) {
			fieldLabel = this.localize('Block style label');
		}
		var dropDownConfiguration = {
			id: dropDownId,
			tooltip: this.localize(dropDownId + '-Tooltip'),
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