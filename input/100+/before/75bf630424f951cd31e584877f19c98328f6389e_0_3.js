function () {
									var selectedCells = jQuery('.aloha-cell-selected');

									if ( typeof button_config === 'string' ) {
										markup.attr('class', button_config);
									} else if ( typeof button_config === 'object' ) {
										//} else if ( typeof button_config === 'object' ) { // check for class and other html-attr
										markup.attr('class', button_config[0]);
									}

									// formating workaround for table plugin
									if ( selectedCells.length > 0 ) {
										var cellMarkupCounter = 0;
										selectedCells.each( function () {
											var cellContent = jQuery(this).find('div'),
											cellMarkup = cellContent.find(button);
											
											if ( cellMarkup.length > 0 ) {
												// unwrap all found markup text
												// <td><b>text</b> foo <b>bar</b></td>
												// and wrap the whole contents of the <td> into <b> tags
												// <td><b>text foo bar</b></td>
												cellMarkup.contents().unwrap();
												cellMarkupCounter++;
											}
											cellContent.contents().wrap('<'+button+'></'+button+'>');
										});

										// remove all markup if all cells have markup
										if ( cellMarkupCounter == selectedCells.length ) {
											selectedCells.find(button).contents().unwrap();
										}
										return false;
									}
									// formating workaround for table plugin

									that.addMarkup( button ); 
									return false;
								}