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
					defaultType: 'textfield',
					labelWidth: 100,
					defaults: {
						labelSeparator: '',
						width: 250,
						listeners: {
							change: {
								fn: this.clearDoc,
								scope: this
							}
						}
					},
					listeners: {
						render: {
							fn: this.initPattern,
							scope: this
						}
					},
					items: [{
							itemId: 'pattern',
							fieldLabel: this.localize('Search for:')
						},{
							itemId: 'replacement',
							fieldLabel: this.localize('Replace with:')
						}
					]
				},{
					xtype: 'fieldset',
					defaultType: 'checkbox',
					title: this.localize('Options'),
					labelWidth: 150,
					items: [{
							itemId: 'words',
							fieldLabel: this.localize('Whole words only'),
							listeners: {
								check: {
									fn: this.clearDoc,
									scope: this
								}
							}
						},{
							itemId: 'matchCase',
							fieldLabel: this.localize('Case sensitive search'),
							listeners: {
								check: {
									fn: this.clearDoc,
									scope: this
								}
							}
						},{
							itemId: 'replaceAll',
							fieldLabel: this.localize('Substitute all occurrences'),
							listeners: {
								check: {
									fn: this.requestReplacement,
									scope: this
								}
							}
						}
					]
				},{
					xtype: 'fieldset',
					defaultType: 'button',
					title: this.localize('Actions'),
					defaults: {
						minWidth: 150,
						disabled: true,
						style: {
							marginBottom: '5px'
						}
					},
					items: [{
							text: this.localize('Clear'),
							itemId: 'clear',
							listeners: {
								click: {
									fn: this.clearMarks,
									scope: this
								}
							}
						},{
							text: this.localize('Highlight'),
							itemId: 'hiliteall',
							listeners: {
								click: {
									fn: this.hiliteAll,
									scope: this
								}
							}
						},{
							text: this.localize('Undo'),
							itemId: 'undo',
							listeners: {
								click: {
									fn: this.resetContents,
									scope: this
								}
							}
						}
					]
				}
			],
			buttons: [
				this.buildButtonConfig('Next', this.onNext),
				this.buildButtonConfig('Done', this.onCancel)
			]
		});
		this.show();
	}