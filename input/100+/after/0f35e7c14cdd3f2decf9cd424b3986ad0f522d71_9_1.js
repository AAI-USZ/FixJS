function (buttonId, title, dimensions) {
		this.dialog = new Ext.Window({
			title: this.getHelpTip(title, title),
			cls: 'htmlarea-window',
			bodyCssClass: 'pasting-pad',
			border: false,
			width: dimensions.width,
			height: 'auto',
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				afterrender: {
						// The document will not be immediately ready
					fn: function (event) { this.onPastingPadAfterRender.defer(100, this, [event]); },
					scope: this
				},
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: [{
					xtype: 'tbtext',
					text: this.getHelpTip('pasteInPastingPad', 'pasteInPastingPad'),
					style: {
						marginBottom: '5px'
					}
				},{
						// The iframe
					xtype: 'box',
					itemId: 'pasting-pad-iframe',
					autoEl: {
						name: 'contentframe',
						tag: 'iframe',
						cls: 'contentframe',
						src: Ext.isGecko ? 'javascript:void(0);' : HTMLArea.editorUrl + 'popups/blank.html'
					}
				}
			],
			buttons: [
				this.buildButtonConfig('OK', this.onPastingPadOK),
				this.buildButtonConfig('Cancel', this.onCancel)
			]
		});
		this.show();
	}