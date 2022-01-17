function (buttonId, title, dimensions) {
		this.dialog = new Ext.Window({
			title: this.localize(title),
			cls: 'htmlarea-window',
			bodyCssClass: 'spell-check',
			border: false,
			width: dimensions.width,
			height: Ext.isIE ? dimensions.height - 50 : 'auto',
			iconCls: this.getButton(buttonId).iconCls,
			listeners: {
				afterrender: {
					fn: this.onWindowAfterRender,
					scope: this
				},
				resize: {
					fn: this.onWindowResize
				},
				close: {
					fn: this.onClose,
					scope: this
				}
			},
			items: [{
						// The hidden form
					xtype: 'form',
					method: 'POST',
					itemId: 'spell-check-form',
					url: this.pageTSconfiguration.path,
					hidden: true,
					standardSubmit: true,
					items: [{
							xtype: 'hidden',
							name: 'editorId',
							value: this.editor.editorId
						},{
							xtype: 'hidden',
							itemId: 'content',
							name: 'content',
							value: this.editor.getHTML()
						},{
							xtype: 'hidden',
							itemId: 'dictionary',
							name: 'dictionary',
							value: this.defaultDictionary ? this.defaultDictionary : this.contentISOLanguage
						},{
							xtype: 'hidden',
							name: 'pspell_charset',
							value: this.contentCharset
						},{
							xtype: 'hidden',
							name: 'pspell_mode',
							value: this.spellCheckerMode
						},{
							xtype: 'hidden',
							name: 'userUid',
							value: this.userUid
						},{
							xtype: 'hidden',
							name:'enablePersonalDicts',
							value: this.enablePersonalDicts
						},{
							xtype: 'hidden',
							name:'restrictToDictionaries',
							value: this.restrictToDictionaries
						}
					]
				},{
						// The iframe
					xtype: 'box',
					itemId: 'spell-check-iframe',
					width: dimensions.width - 225,
					autoEl: {
						name: 'contentframe',
						tag: 'iframe',
						cls: 'contentframe',
						src: Ext.isGecko ? 'javascript:void(0);' : HTMLArea.editorUrl + 'popups/blank.html'
					}
				},{
						// The original word
					xtype: 'fieldset',
					title: this.localize('Original word'),
					cls: 'controls',
					labelWidth: 0,
					defaults: {
						hideLabel: true,
						disabled: true,
						minWidth: 160
					},
					items: [{
							xtype: 'textfield',
							itemId: 'word',
							disabled: false
						},
						this.buildButtonConfig('Revert', this.onRevertClick)
					]
				},{
						// The replacement word and actions
					xtype: 'fieldset',
					title: this.localize('Replacement'),
					cls: 'controls',
					defaultType: 'button',
					labelWidth: 0,
					defaults: {
						hideLabel: true,
						disabled: true,
						minWidth: 160
					},
					items: [{
							xtype: 'textfield',
							disabled: false,
							width: 160,
							itemId: 'replacement'
						},{
							itemId: 'replace',
							text: this.localize('Replace'),
							listeners: {
								click: {
									fn: this.onReplaceClick,
									scope: this
								}
							}
						},{
							itemId: 'replaceAll',
							text: this.localize('Replace all'),
							listeners: {
								click: {
									fn: this.onReplaceAllClick,
									scope: this
								}
							}
						},{
							itemId: 'ignore',
							text: this.localize('Ignore'),
							listeners: {
								click: {
									fn: this.onIgnoreClick,
									scope: this
								}
							}
						},{
							itemId: 'ignoreAll',
							text: this.localize('Ignore all'),
							listeners: {
								click: {
									fn: this.onIgnoreAllClick,
									scope: this
								}
							}
						},{
							itemId: 'learn',
							text: this.localize('Learn'),
							hidden: !this.enablePersonalDicts,
							listeners: {
								click: {
									fn: this.onLearnClick,
									scope: this
								}
							}
						}
					]
				},{
						// The suggestions
					xtype: 'fieldset',
					title: this.localize('Suggestions'),
					cls: 'controls',
					labelWidth: 0,
					defaults: {
						hideLabel: true,
						minWidth: 160
					},
					items: [
						Ext.apply({
							xtype: 'combo',
							itemId: 'suggestions',
							store: new Ext.data.ArrayStore({
								autoDestroy:  true,
								fields: [{name: 'text'}, {name: 'value'}],
								data: []
							}),
							listeners: {
								select: {
									fn: this.onSuggestionSelect,
									scope: this
								}
							}
						}, this.configDefaults['combo'])
					]
				},{
						// The dictionaries
					xtype: 'fieldset',
					title: this.localize('Dictionary'),
					cls: 'controls',
					defaultType: 'button',
					labelWidth: 0,
					defaults: {
						hideLabel: true,
						disabled: true,
						minWidth: 160
					},
					items: [
						Ext.apply({
							xtype: 'combo',
							itemId: 'dictionaries',
							disabled: false,
							store: new Ext.data.ArrayStore({
								autoDestroy:  true,
								fields: [{name: 'text'}, {name: 'value'}],
								data: []
							}),
							listeners: {
								select: {
									fn: this.onDictionarySelect,
									scope: this
								}
							}
						}, this.configDefaults['combo']),
						{
							itemId: 'recheck',
							text: this.localize('Re-check'),
							listeners: {
								click: {
									fn: this.onRecheckClick,
									scope: this
								}
							}
						}
					]
				}
			],
			bbar: {
				defaults: {
					disabled: true
				},
				items: [
					{
						xtype: 'tbtext',
						itemId: 'spell-check-status',
						text: this.localize('Please wait. Calling spell checker.'),
						cls: 'status-wait',
						disabled: false
					},
					'->',
					this.buildButtonConfig('OK', this.onOK),
					this.buildButtonConfig('Info', this.onInfoClick),
					this.buildButtonConfig('Cancel', this.onCancel)
				]
			}
		});
		this.show();
	}