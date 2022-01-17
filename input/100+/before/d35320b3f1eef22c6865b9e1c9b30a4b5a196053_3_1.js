function (buttonId, title, dimensions) {
		this.dialog = new Ext.Window({
			title: this.localize(title),
			cls: 'htmlarea-window',
			border: false,
			width: dimensions.width,
			height: 'auto',
				// As of ExtJS 3.1, JS error with IE when the window is resizable
			resizable: !Ext.isIE,
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: [{
					xtype: 'fieldset',
					defaultType: 'radio',
					title: this.getHelpTip('behaviour', title),
					labelWidth: 170,
					defaults: {
						labelSeparator: '',
						name: buttonId
					},
					items: [{
							itemId: 'plainText',
							fieldLabel: this.getHelpTip('plainText', 'plainText'),
							checked: (this.currentBehaviour === 'plainText')
						},{
							itemId: 'pasteStructure',
							fieldLabel: this.getHelpTip('pasteStructure', 'pasteStructure'),
							checked: (this.currentBehaviour === 'pasteStructure')
						},{
							itemId: 'pasteFormat',
							fieldLabel: this.getHelpTip('pasteFormat', 'pasteFormat'),
							checked: (this.currentBehaviour === 'pasteFormat')
						}
					]
				}
			],
			buttons: [
				this.buildButtonConfig('OK', this.onOK)
			]
		});
		this.show();
	}