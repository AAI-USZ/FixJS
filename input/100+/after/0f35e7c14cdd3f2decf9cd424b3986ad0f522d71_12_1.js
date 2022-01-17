function (title, arguments, dimensions, items, handler) {
		if (this.dialog) {
			this.dialog.close();
		}
		this.dialog = new Ext.Window({
			title: this.localize(title),
			arguments: arguments,
			cls: 'htmlarea-window',
			border: false,
			width: dimensions.width,
			height: dimensions.height,
			autoScroll: true,
			iconCls: this.getButton(arguments.buttonId).iconCls,
			listeners: {
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: {
				xtype: 'container',
				layout: 'form',
				style: {
					width: '95%'
				},
				defaults: {
					labelWidth: 150
				},
				items: items
			},
			buttons: [
				this.buildButtonConfig('OK', handler),
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}