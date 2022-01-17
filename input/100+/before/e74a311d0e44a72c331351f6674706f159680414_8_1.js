function (editor, id) {
			// Could be a button or its hotkey
		var buttonId = this.translateHotKey(id);
		buttonId = buttonId ? buttonId : id;
		var dimensions = this.getWindowDimensions({width:216, height:230}, buttonId);
		this.dialog = new Ext.Window({
			title: this.localize('Insert Smiley'),
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
				xtype: 'box',
				cls: 'emoticon-array',
				tpl: new Ext.XTemplate(
					'<tpl for="."><a href="#" class="emoticon" hidefocus="on" ext:qtitle="{alt}" ext:qtip="{title}"><img src="{file}" /></a></tpl>'
				),
				listeners: {
					render: {
						fn: this.render,
						scope: this
					}
				}
			},
			buttons: [this.buildButtonConfig('Cancel', this.onCancel)]
		});
		this.show();
	}