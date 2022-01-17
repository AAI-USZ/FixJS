function() {
			var that = this;

			// Harverst configuration options that may be defined outside of
			// the plugin.
			if ( Aloha.settings &&
			     Aloha.settings.plugins &&
			     Aloha.settings.plugins.cite ) {
				var referenceContainer = jQuery(
					Aloha.settings.plugins.cite.referenceContainer );

				if ( referenceContainer.length ) {
					this.referenceContainer = referenceContainer;
				}

				if ( typeof Aloha.settings.plugins.cite !== 'undefinded' ) {
					that.settings = Aloha.settings.plugins.cite;
				}

				if ( typeof that.settings.sidebar === 'undefinded' ) {
					that.settings.sidebar = {};
				}

				if ( typeof that.settings.sidebar.open === 'undefinded' ) {
					that.settings.sidebar.open = true;
				}
			}

			// Add the inline quote button in the floating menu, in the
			// standard manner...
			this.buttons = [];

			this.buttons[ 0 ] = new Aloha.ui.Button({
				name      : 'quote',
				text      : 'Quote', // that.i18n('button.' + button + '.text'),
				tooltip   : i18n.t( 'cite.button.add.quote' ), // that.i18n('button.' + button + '.tooltip'),
				iconClass : nsClass( 'button','inline-button' ),
				size      : 'small',
				toggle    : true,
				onclick   : function() {
					that.addInlineQuote();
				}
			});

			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.buttons[ 0 ],
				i18nCore.t( 'floatingmenu.tab.format' ),
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
				tooltip   : i18n.t( 'cite.button.add.blockquote' ),	// that.i18n('button.' + button + '.tooltip'),
				iconClass : nsClass( 'button', 'block-button' ),
				click     : function() {
					that.addBlockQuote();
				}
			});

			var citePlugin = this;

			// Note that if the sidebar is not loaded,
			// aloha-sidebar-initialized will not fire and this listener will
			// not be called, which is what we would want if there are no
			// sidebars
			Aloha.ready( function( ev ) {
				citePlugin.sidebar = Aloha.Sidebar.right.show();
				// citePlugin.sidebar.settings.overlayPage = false;
				citePlugin.sidebar.addPanel({
					id       : nsClass( 'sidebar-panel' ),
					title    : 'Citation',
					content  : '',
					expanded : true,
					activeOn : '.aloha-cite-wrapper',

					// Executed once, when this panel object is instantialized
					onInit   : function() {
						var that = this;
						var content = this.setContent( renderTemplate(
							   '<div class="{panel-label}">Link:</div>\
								<div class="{panel-field} {link-field}" \
								style="margin: 5px;"><input type="text" /></div>'
								+ ( citePlugin.referenceContainer
									? '<div class="{panel-label}">Note:</div>\
									   <div class="{panel-field} {note-field}"\
									   style="margin: 5px;">\
									   <textarea></textarea></div>'
									: '' )
							) ).content;

						content
							.find( 'input, textarea' )
							.bind( 'keypress change', function() {
								citePlugin.addCiteDetails(
									that.content.attr( 'data-cite-id' ),
									that.content.find( nsSel( 'link-field input' ) ).val(),
									that.content.find( nsSel( 'note-field textarea' ) ).val()
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
					onActivate: function( effective ) {
						var uid = effective.attr( 'data-cite-id' );
						var index = that.getIndexOfCitation( uid );

						if ( -1 === index ) {
							index = that.citations.push({
								uid   : uid,
								link  : null,
								notes : null
							}) - 1;
						}

						this.content.attr( 'data-cite-id', uid );
						this.content.find( nsSel( 'link-field input' ) )
						    .val( effective.attr( 'cite' ) );
						this.content.find( nsSel( 'note-field textarea' ) )
						    .val( that.citations[ index ].note );
					}

				});
			});

			Aloha.bind( 'aloha-selection-changed', function( event, rangeObject ) {
				Format.multiSplitButton.showItem( 'blockquote' );
				var buttons = jQuery( 'button' + nsSel( 'button' ) );

				jQuery.each( that.buttons, function( index, button ) {
					// Set to false to prevent multiple buttons being active
					// when they should not.
					var statusWasSet = false;
					var tagName;
					var effective = rangeObject.markupEffectiveAtStart;
					var i = effective.length;

					// Check whether any of the effective items are citation
					// tags.
					while ( i ) {
						tagName = effective[ --i ].tagName.toLowerCase();
						if ( tagName === 'q' || tagName === 'blockquote' ) {
							statusWasSet = true;
							break;
						}
					}

					buttons.filter( nsSel( 'block-button' ) )
					       .removeClass( nsClass( 'pressed' ) );

					that.buttons[ 0 ].setPressed( false );

					if ( statusWasSet ) {
						if( 'q' === tagName ) {
							that.buttons[ 0 ].setPressed( true );
						} else {
							buttons.filter( nsSel( 'block-button' ) )
							       .addClass( nsClass( 'pressed' ) );
						}

						// We've got what we came for, so return false to break
						// the each loop.
						return false;
					}
				});
			});
		}