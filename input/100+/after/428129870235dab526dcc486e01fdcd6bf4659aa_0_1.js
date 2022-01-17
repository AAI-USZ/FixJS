function(elements) {
		if (bb.device.isBB10) {
			var res;
			if (bb.device.isPlayBook) {
				res = 'lowres';
			} else {
				res = 'hires';
			}
			// Apply our transforms to all grids
			for (var i = 0; i < elements.length; i++) {
				var j,
					items,
					type,
					title,
					innerChildNode,
					contextMenu,
					outerElement = elements[i];
					
				outerElement.setAttribute('class','bb-bb10-grid-'+res);	
				// See if it is square or landscape layout
				outerElement.isSquare = (outerElement.hasAttribute('data-bb-style') && outerElement.getAttribute('data-bb-style').toLowerCase() == 'square');
				
				// Assign our context menu if there is one
				if (outerElement.hasAttribute('data-bb-context') && outerElement.getAttribute('data-bb-context').toLowerCase() == 'true') {
					contextMenu = bb.screen.contextMenu;
				}
				
				// Gather our inner items
				items = outerElement.querySelectorAll('[data-bb-type=group], [data-bb-type=row]');
				for (j = 0; j < items.length; j++) {
					innerChildNode = items[j];
					if (innerChildNode.hasAttribute('data-bb-type')) {
					
						type = innerChildNode.getAttribute('data-bb-type').toLowerCase();
						if (type == 'group' && innerChildNode.hasAttribute('data-bb-title')) {
							title = document.createElement('div');
							title.normal = 'bb-bb10-grid-header-'+res+' bb10Accent';
							title.highlight = 'bb-bb10-grid-header-'+res+' bb10Highlight';
							title.innerHTML = '<p>'+ innerChildNode.getAttribute('data-bb-title') +'</p>';
							title.setAttribute('class', title.normal);
							title.ontouchstart = function() {
													this.setAttribute('class',this.highlight);
												};
							title.ontouchend = function() {
													this.setAttribute('class',this.normal);
												};
							if (innerChildNode.firstChild) {
								innerChildNode.insertBefore(title, innerChildNode.firstChild);
							} else {
								innerChildNode.appendChild(title);
							}
						}
						else if (type == 'row') {
							var k,
								numItems,
								itemNode,
								columnClass,
								subtitle,
								image,
								overlay,
								subtitle,
								height,
								width,
								hasOverlay,
								rowItems = innerChildNode.querySelectorAll('[data-bb-type=item]');
							
							innerChildNode.setAttribute('class', 'bb-bb10-grid-row-'+res);
							numItems = rowItems.length;
							if (numItems > 0) {
								columnClass = 'bb-bb10-grid-item-col-' + numItems+'-'+res;
							}

							for (k = 0; k < numItems; k++) {
								itemNode = rowItems[k];
								subtitle = itemNode.innerHTML;
								title = itemNode.getAttribute('data-bb-title');
								hasOverlay = (subtitle || title);
								itemNode.innerHTML = '';
								if (bb.device.isPlayBook) {
									width = ((window.innerWidth/numItems) - 5);
								} else {
									width = ((window.innerWidth/numItems) - 8);
								}
								if (outerElement.isSquare) {
									height = width;
								} else {
									height = Math.ceil(width*0.5625);
								}
								itemNode.setAttribute('class', 'bb-bb10-grid-item ' + columnClass);
								itemNode.style.width = width + 'px';
								itemNode.style.height = height + 'px';

								// Create our display image
								image = document.createElement('img');
								image.setAttribute('src',itemNode.getAttribute('data-bb-img'));
								image.setAttribute('style','height:100%;width:100%;');
								itemNode.appendChild(image);
								// Create our translucent overlay
								if (hasOverlay) {
									overlay = document.createElement('div');
									overlay.setAttribute('class','bb-bb10-grid-item-overlay-'+res);
									overlay.innerHTML = '<div><p class="title">' + title + '<br/>' + subtitle +'</p></div>';								
									itemNode.appendChild(overlay);
									
								} else {
									overlay = null;
								}
								
								itemNode.removeAttribute('data-bb-img');
								itemNode.removeAttribute('data-bb-title');
								
								// Setup our variables
								itemNode.overlay = overlay;
								itemNode.title = title;
								itemNode.description = subtitle;
								itemNode.fingerDown = false;
								itemNode.contextShown = false;
								itemNode.contextMenu = contextMenu;
								itemNode.ontouchstart = function() {
															if (this.overlay) {
																this.overlay.setAttribute('style','opacity:1.0;background-color:' + bb.options.bb10HighlightColor +';');
															}
															itemNode.fingerDown = true;
															itemNode.contextShown = false;
															if (itemNode.contextMenu) {
																window.setTimeout(this.touchTimer, 667);
															}
														};
								itemNode.ontouchend = function() {
															if (this.overlay) {
																this.overlay.setAttribute('style','');
															}
															itemNode.fingerDown = false;
															if (itemNode.contextShown) {
																event.preventDefault();
																event.stopPropagation();
															}
														};
								itemNode.touchTimer = function() {
																if (itemNode.fingerDown) {
																	itemNode.contextShown = true;
																	itemNode.contextMenu.peek({title:this.title,description:this.description, selected: this});
																}
															};
								itemNode.touchTimer = itemNode.touchTimer.bind(itemNode);
								
							}						
							
						}
					}
				}
				
				// Make sure we move when the orientation of the device changes
				outerElement.orientationChanged = function(event) {
										var items = this.querySelectorAll('[data-bb-type=row]'),
											i,j,
											rowItems,
											numItems,
											itemNode,
											width,
											height,
											innerWidth;
										
										// Orientation is backwards between playbook and BB10 smartphones
										if (bb.device.isPlayBook) {
											if (window.orientation == 0 || window.orientation == 180) {
												innerWidth = 1024;  // Doesn't seem to calculate width to the new width when this even fires
											} else if (window.orientation == -90 || window.orientation == 90) {
												innerWidth = 600;
											}
										} else {
											if (window.orientation == 0 || window.orientation == 180) {
												innerWidth = 768;
											} else if (window.orientation == -90 || window.orientation == 90) {
												innerWidth = 1280;
											}
										}
					
										for (i = 0; i < items.length; i++) {
											rowItems = items[i].querySelectorAll('[data-bb-type=item]');
											numItems = rowItems.length;
											for (j = 0; j < numItems; j++ ) {
												itemNode = rowItems[j];
												if (bb.device.isPlayBook) {
													width = ((innerWidth/numItems) - 5);
												} else {
													width = ((innerWidth/numItems) - 8);
												}
												if (outerElement.isSquare) {
													height = width;
												} else {
													height = Math.ceil(width*0.5625);
												}
												itemNode.style.width = width+'px';
												itemNode.style.height = height+'px';
											}
										}
									};
				outerElement.orientationChanged = outerElement.orientationChanged.bind(outerElement);	
				window.addEventListener('orientationchange', outerElement.orientationChanged,false); 
			}		
		} else {
			// Make the grids invisible if it isn't BB10
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = 'none';
			}
		}
    }