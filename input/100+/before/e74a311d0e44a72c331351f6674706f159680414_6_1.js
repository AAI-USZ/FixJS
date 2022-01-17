function (buttonId, title, dimensions, tabItems, buttonsConfig) {
		this.dialog = new Ext.Window({
			title: this.getHelpTip('', title),
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
			items: {
				xtype: 'tabpanel',
				activeTab: 0,
				defaults: {
					xtype: 'container',
					layout: 'form',
					defaults: {
						labelWidth: 150
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
			buttons: buttonsConfig
		});
		this.show();
	}