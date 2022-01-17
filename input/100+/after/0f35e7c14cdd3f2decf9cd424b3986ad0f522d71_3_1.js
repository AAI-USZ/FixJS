function (buttonId, title, dimensions, tabItems, handler) {
		this.dialog = new Ext.Window({
			title: this.localize(title),
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
				activeTab: 0,
				listeners: {
					activate: {
						fn: this.resetFocus,
						scope: this
					},
					tabchange: {
						fn: this.syncHeight,
						scope: this
					}
				},
				items: tabItems
			},
			buttons: [
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}