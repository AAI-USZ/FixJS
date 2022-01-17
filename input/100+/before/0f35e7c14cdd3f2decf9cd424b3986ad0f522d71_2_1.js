function (title, buttonId, dimensions, tabItems, buttonsConfig, activeTab) {
		this.dialog = new Ext.Window({
			title: this.getHelpTip('', title),
			cls: 'htmlarea-window',
				// As of ExtJS 3.1, JS error with IE when the window is resizable
			resizable: !Ext.isIE,
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
				activeTab: activeTab ? activeTab : 0,
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