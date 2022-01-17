function (title, arguments, dimensions, tabItems, handler) {
		if (this.dialog) {
			this.dialog.close();
		}
		this.dialog = new Ext.Window({
			title: this.getHelpTip(arguments.buttonId, title),
			arguments: arguments,
			cls: 'htmlarea-window',
				// As of ExtJS 3.1, JS error with IE when the window is resizable
			resizable: !Ext.isIE,
			border: false,
			width: dimensions.width,
			height: 'auto',
			iconCls: this.getButton(arguments.buttonId).iconCls,
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
			buttons: [
				this.buildButtonConfig('OK', handler),
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}