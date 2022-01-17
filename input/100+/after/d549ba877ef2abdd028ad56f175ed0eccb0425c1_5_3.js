function(obj, event) {
				
				// Now show all the ui-attributefield elements
				jQuery('.x-layer x-combo-list').show(); 
				jQuery('.x-combo-list-inner').show();
				jQuery('.x-combo-list').show();
				
				// if the user presses ESC we do a rough check if he has entered a link or searched for something
				if (event.keyCode == 27) {
					var curval = that.hrefField.getQueryValue();
					if (
						curval[0] === '/' || // local link
						curval.match(/^.*\.([a-z]){2,4}$/i) || // local file with extension
						curval[0] === '#' || // inner document link
						curval.match(/^htt.*/i)  // external link
					) {
						// could be a link better leave it as it is
					} else {
						// the user searched for something and aborted restore original value
						// that.hrefField.setValue(that.hrefField.getValue());
					}
				}

				that.hrefChange();
				
				
				// Handle the enter key. Terminate the link scope and show the final link.
				if (event.keyCode == 13) {
					// Update the selection and place the cursor at the end of the link.
					var	range = Aloha.Selection.getRangeObject();
					
					// workaround to keep the found markup otherwise removelink won't work
					var foundMarkup = that.findLinkMarkup( range );
					that.hrefField.setTargetObject(foundMarkup, 'href');
					
					that.ignoreNextSelectionChangedEvent = true;
					range.startContainer = range.endContainer;
					range.startOffset = range.endOffset;
					range.select();
					//that.ignoreNextSelectionChangedEvent = true;
					
					var hrefValue = jQuery(that.hrefField.extButton.el.dom).attr('value');
					if (hrefValue ==="http://" || hrefValue === "") {
						that.removeLink(false);
					}
					
					setTimeout( function() {
						FloatingMenu.setScope('Aloha.continuoustext');
					}, 100);
					
					jQuery('.x-layer').hide();
					jQuery('.x-shadow').hide();
					jQuery('.x-combo-list-inner').hide();
					jQuery('.x-combo-list').hide();
					
					setTimeout( function() {
						jQuery('.x-layer').hide();
						jQuery('.x-shadow').hide();
						jQuery('.x-combo-list-inner').hide();
						jQuery('.x-combo-list').hide();
							
					},200);
					
				}
				
			}