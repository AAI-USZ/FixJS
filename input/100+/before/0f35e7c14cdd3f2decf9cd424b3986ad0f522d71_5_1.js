function (buttonId, title, dimensions) {
		this.dialog = new Ext.Window({
			title: this.localize(title) || title,
			cls: 'htmlarea-window',
			border: false,
			width: dimensions.width,
			height: 'auto',
				// As of ExtJS 3.1, JS error with IE when the window is resizable
			resizable: !Ext.isIE,
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				afterrender: {
					fn: this.onAfterRender,
					scope: this
				},
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
						helpIcon: true,
						width: 250,
						labelSeparator: ''
					},
					items: [{
							itemId: 'href',
							name: 'href',
							fieldLabel: this.localize('URL:'),
							value: this.parameters.href,
							helpTitle: this.localize('link_href_tooltip')
						},{
							itemId: 'title',
							name: 'title',
							fieldLabel: this.localize('Title (tooltip):'),
							value: this.parameters.title,
							helpTitle: this.localize('link_title_tooltip')
						}, Ext.apply({
							xtype: 'combo',
							fieldLabel: this.localize('Target:'),
							itemId: 'target',
							helpTitle: this.localize('link_target_tooltip'),
							store: new Ext.data.ArrayStore({
								autoDestroy:  true,
								fields: [ { name: 'text'}, { name: 'value'}],
								data: [
									[this.localize('target_none'), ''],
									[this.localize('target_blank'), '_blank'],
									[this.localize('target_self'), '_self'],
									[this.localize('target_top'), '_top'],
									[this.localize('target_other'), '_other']
								]
							}),
							listeners: {
								select: {
									fn: this.onTargetSelect
								}
							},
							hidden: !this.showTarget
							}, this.configDefaults['combo'])
						,{
							itemId: 'frame',
							name: 'frame',
							fieldLabel: this.localize('frame'),
							helpTitle: this.localize('frame_help'),
							hideLabel: true,
							hidden: true
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