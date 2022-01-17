function (buttonId, title, dimensions, url) {
		this.dialog = new Ext.Window({
			id: this.editor.editorId + buttonId,
			title: this.localize(title) || title,
			cls: 'htmlarea-window',
			width: dimensions.width,
			border: false,
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				afterrender: {
					fn: this.onContainerResize
				},
				resize: {
					fn: this.onContainerResize
				},
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: {
					// The content iframe
				xtype: 'box',
				height: dimensions.height-20,
				itemId: 'content-iframe',
				autoEl: {
					tag: 'iframe',
					cls: 'content-iframe',
					src: url
				}
			}
		});
		this.show();
	}