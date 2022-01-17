function() {
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
					}