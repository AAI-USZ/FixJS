function( ev ) {
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
			}