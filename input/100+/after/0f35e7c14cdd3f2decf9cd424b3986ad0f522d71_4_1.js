function (buttonId, title, dimensions, tabItems) {
		this.dialog = new Ext.Window({
			title: this.localize(title) || title,
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
			items: {
				xtype: 'tabpanel',
				itemId: 'tabpanel',
				activeTab: 0,
				defaults: {
					xtype: 'container',
					layout: 'form',
					defaults: {
						labelWidth: 100
					}
				},
				listeners: {
					tabchange: {
						fn: this.syncHeight,
						scope: this
					}
				},
				items: tabItems
			},
			buttons: [
				this.buildButtonConfig('OK', this.onOK),
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}