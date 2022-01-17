function () {
			var that = this;

			// Harverst configuration options that may be defined outside of
			// the plugin.
			if (Aloha.settings && Aloha.settings.plugins && Aloha.settings.plugins.cite) {

				var referenceContainer = jQuery(Aloha.settings.plugins.cite.referenceContainer);

				if (referenceContainer.length) {
					that.referenceContainer = referenceContainer;
				}

				if (typeof Aloha.settings.plugins.cite !== 'undefined') {
					that.settings = Aloha.settings.plugins.cite;
				}

				if (typeof that.settings.sidebar === 'undefined') {
					that.settings.sidebar = {};
				}

				if (typeof that.settings.sidebar.open === 'undefined') {
					that.settings.sidebar.open = true;
				}

				// be tolerant about the setting: 'false' and '0' (as strings) will be interpreted as false (boolean)
				if (typeof that.settings.sidebar.open === 'string') {
					that.settings.sidebar.open = that.settings.sidebar.open.toLowerCase();
					if (that.settings.sidebar.open === 'false' || that.settings.sidebar.open === '0') {
						// disable button only if 'false' or '0' is specified
						that.settings.sidebar.open = false;
					} else {
						// otherwise the button will always be shown
						that.settings.sidebar.open = true;
					}
				}
			}

			// Add the inline quote button in the floating menu, in the
			// standard manner...
			this.buttons = [];

			this.buttons[0] = new Aloha.ui.Button({
				name      : 'quote',
				text      : 'Quote', // that.i18n('button.' + button + '.text'),
				tooltip   : i18n.t('cite.button.add.quote'), // that.i18n('button.' + button + '.tooltip'),
				iconClass : nsClass('button', 'inline-button'),
				size      : 'small',
				toggle    : true,
				onclick   : function () {
					that.addInlineQuote();
				}
			});

			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.buttons[0],
				i18nCore.t('floatingmenu.tab.format'),
				1
			);

			// We brute-forcishly push our button settings into the
			// multiSplitButton.  The multiSplitButton will pick it up and
			// render it.  Nevertheless, because this button is added late, it
			// means that it will not be automatically shown when doLayout is
			// called on the FloatingMenu.  We therefore have to do it
			// ourselves at aloha-selection-changed.
			Format.multiSplitButton.items.push({
				name      : 'blockquote',
				text      : 'Blockquote', // that.i18n('button.' + button + '.text'),
				tooltip   : i18n.t('cite.button.add.blockquote'),	// that.i18n('button.' + button + '.tooltip'),
				iconClass : nsClass('button', 'block-button'),
				click     : function () {
					that.addBlockQuote();
				}
			});

			var citePlugin = this;

			// Note that if the sidebar is not loaded,
			// aloha-sidebar-initialized will not fire and this listener will
			// not be called, which is what we would want if there are no
			// sidebars
			Aloha.ready(function (ev) {
				citePlugin.sidebar = Aloha.Sidebar.right.show();
				// citePlugin.sidebar.settings.overlayPage = false;
				citePlugin.sidebar.addPanel({
					id       : nsClass('sidebar-panel'),
					title    : 'Citation',
					content  : '',
					expanded : true,
					activeOn : '.aloha-cite-wrapper',

					// Executed once, when this panel object is instantialized
					onInit   : function () {
						var that = this;
						var additionalReferenceContainer = '';
						
						if (citePlugin.referenceContainer) {
							additionalReferenceContainer = '<div class="{panel-label}">Note:</div> ' +
															'<div class="{panel-field} {note-field}" ' +
															'style="margin: 5px;">' +
															'<textarea></textarea></div>';
						}
						
						var content = this.setContent(renderTemplate(
								'<div class="{panel-label}">Link:</div>' +
								'<div class="{panel-field} {link-field}" ' + 
								'style="margin: 5px;"><input type="text" /></div>' +
								additionalReferenceContainer
							)).content;

						content.find('input, textarea')
							.bind('keypress change', function () {
								citePlugin.addCiteDetails(
									that.content.attr('data-cite-id'),
									that.content.find(nsSel('link-field input')).val(),
									that.content.find(nsSel('note-field textarea')).val()
								);
							});
					},

					/**
					 * Invoked during aloha-selection-changed, if activeOn
					 * function returns true for the current selection.  Will
					 * populate panel fields with the details of the selected
					 * citation if they are already available.  If no citation
					 * exists for the selected quotation, then one will be
					 * created for it first.
					 */
					onActivate: function (effective) {
						var uid = effective.attr('data-cite-id');
						var index = that.getIndexOfCitation(uid);

						if (-1 === index) {
							index = that.citations.push({
								uid   : uid,
								link  : null,
								notes : null
							}) - 1;
						}

						this.content.attr('data-cite-id', uid);
						this.content.find(nsSel('link-field input'))
						    .val(effective.attr('cite'));
						this.content.find(nsSel('note-field textarea'))
						    .val(that.citations[index].note);
					}

				});
			});

			Aloha.bind('aloha-editable-activated', function (event, params) {
				var config = that.getEditableConfig(params.editable.obj);

				if (!config) {
					return;
				}
				
				if (jQuery.inArray('quote', config) !== -1) {
					that.buttons[0].show();
				} else {
					that.buttons[0].hide();
				}
				
				if (jQuery.inArray('blockquote', config) !== -1) {
					Format.multiSplitButton.showItem('blockquote');
				} else {
					Format.multiSplitButton.hideItem('blockquote');
				}
				
			});

			// add the event handler for context selection change
			PubSub.sub('aloha.selection.context-change', function (message) {
				var buttons = jQuery('button' + nsSel('button')); // not used?
				var rangeObject = message.range;
				
				jQuery.each(that.buttons, function (index, button) {
					// Set to false to prevent multiple buttons being active
					// when they should not.
					var statusWasSet = false;
					var tagName;
					var effective = rangeObject.markupEffectiveAtStart;
					var i = effective.length;

					// Check whether any of the effective items are citation
					// tags.
					while (i) {
						tagName = effective[--i].tagName.toLowerCase();
						if (tagName === 'q' || tagName === 'blockquote') {
							statusWasSet = true;
							break;
						}
					}

					buttons.filter(nsSel('block-button')).removeClass(nsClass('pressed'));

					that.buttons[0].setPressed(false);
					//button.setPressed( false ); // should it be this instead of that.buttons...?

					if (statusWasSet) {
						if ('q' === tagName) {
							that.buttons[0].setPressed(true);
							//button.setPressed( true ); // should it be this instead of that.buttons...?
						} else {
							buttons.filter(nsSel('block-button'))
							       .addClass(nsClass('pressed'));
						}

						// We've got what we came for, so return false to break
						// the each loop.
						return false;
					}
				});
				
				// switch item visibility according to config
				var config = [];
				if (Aloha.activeEditable) {
					config = that.getEditableConfig(Aloha.activeEditable.obj);
				}
				
				// quote
				if (jQuery.inArray('quote', config) != -1) {
					that.buttons[0].show();
				} else {
					that.buttons[0].hide();
				}
				
				// blockquote
				if (jQuery.inArray('blockquote', config) != -1) {
					Format.multiSplitButton.showItem('blockquote');
				} else {
					Format.multiSplitButton.hideItem('blockquote');
				}
				
				FloatingMenu.doLayout();
			});
		}