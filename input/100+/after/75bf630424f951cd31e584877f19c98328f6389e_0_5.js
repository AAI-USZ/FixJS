function(j, button) {
					var button_config = false;

					if ( typeof j !== 'number' && typeof button !== 'string' ) {
						button_config = button;
						button = j;
					}

					switch( button ) {
						// text level semantics:
						case 'u':
						case 'em':
						case 'strong':
						case 'b':
						case 'i':
						case 'cite':
						case 'q':
						case 'code':
						case 'abbr':
						case 'del':
						case 's':
						case 'sub':
						case 'sup':
							var command = commandsByElement[button];
							var componentName = command;
							if (componentNameByElement.hasOwnProperty(button)) {
								componentName = componentNameByElement[button];
							}
							Component.define(componentName, ToggleButton, {
								tooltip : i18n.t('button.' + button + '.tooltip'),
								icon: 'aloha-icon aloha-icon-' + componentName,
								scope: scope,
								click: function () {
									var selectedCells = jQuery('.aloha-cell-selected');

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
										if ( cellMarkupCounter === selectedCells.length ) {
											selectedCells.find(button).contents().unwrap();
										}
										return false;
									}
									// formating workaround for table plugin

									that.addMarkup( button ); 
									return false;
								}
							});
							that.buttons[button] = {
								type: componentName,
								'markup' : jQuery('<'+button+'>', {'class': button_config || ''})
							};
							break;

						case 'p':
						case 'h1':
						case 'h2':
						case 'h3':
						case 'h4':
						case 'h5':
						case 'h6':
						case 'pre':
							that.multiSplitItems.push({
								'name' : button,
								'tooltip' : i18n.t('button.' + button + '.tooltip'),
								'iconClass' : 'aloha-icon ' + i18n.t('aloha-large-icon-' + button),
								'markup' : jQuery('<'+button+'>'),
								'click' : function() {
									var selectedCells = jQuery('.aloha-cell-selected');

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
										if ( cellMarkupCounter === selectedCells.length ) {
											selectedCells.find(button).contents().unwrap();
										}
										return false;
									}
									// formating workaround for table plugin

									that.changeMarkup( button );

								}
							});
							break;

						// wide multisplit buttons
						case 'removeFormat':
							that.multiSplitItems.push({
								name: button,
								text: i18n.t('button.' + button + '.text'),
								tooltip: i18n.t('button.' + button + '.tooltip'),
								wide: true,
								'cls': 'aloha-ui-multisplit-fullwidth',
								click: function () {
									that.removeFormat();
								}
							});
							break;
						//no button defined
						default:
							Aloha.log('warn', this, 'Button "' + button + '" is not defined');
							break;
					}
				}