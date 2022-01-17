function (buttonId, title, dimensions) {
		this.dialog = new Ext.Window({
			title: this.getHelpTip('', title),
			cls: 'htmlarea-window',
			border: false,
			width: dimensions.width,
			height: 'auto',
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: [{
					xtype: 'fieldset',
					title: this.getHelpTip('area', 'Cleaning Area'),
					defaultType: 'radio',
					labelWidth: 140,
					defaults: {
						labelSeparator: ''
					},
					items: [{
							itemId: 'selection',
							fieldLabel: this.getHelpTip('selection', 'Selection'),
							name: 'htmlarea-removeFormat-area'
						},{
							itemId: 'allContent',
							fieldLabel: this.getHelpTip('all', 'All'),
							checked: true,
							name: 'htmlarea-removeFormat-area'
						}
					]
				},{
					xtype: 'fieldset',
					defaultType: 'checkbox',
					title: this.getHelpTip('options', 'Cleaning options'),
					labelWidth: 170,
					defaults: {
						labelSeparator: ''
					},
					items: [{
							itemId: 'formatting',
							fieldLabel: this.getHelpTip('htmlFormat', 'Formatting:')
						},{
							itemId: 'msWordFormatting',
							fieldLabel: this.getHelpTip('msWordFormat', 'MS Word Formatting:'),
							checked: true
						},{
							itemId: 'typographical',
							fieldLabel: this.getHelpTip('typographicalPunctuation', 'Typographical punctuation:')
						},{
							itemId: 'spaces',
							fieldLabel: this.getHelpTip('nonBreakingSpace', 'Spaces')
						},{
							itemId: 'images',
							fieldLabel: this.getHelpTip('images', 'Images:')
						},{
							itemId: 'allHtml',
							fieldLabel: this.getHelpTip('allHtml', 'All HTML:')
						}
					]
				}
			],
			buttons: [
				this.buildButtonConfig('OK', this.onOK),
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}