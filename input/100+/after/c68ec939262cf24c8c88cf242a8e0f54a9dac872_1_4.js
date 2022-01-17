function(elements) {
		if (bb.device.isBB10) {
			var res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
				i,j,
				outerElement,
				innerChildNode,
				normal,
				highlight,
				contextMenu,
				items,
				hideImages,
				imageEffect,
				imagePlaceholder;
		
			// Apply our transforms to all Image Lists
			for (i = 0; i < elements.length; i++) {
				outerElement = elements[i];
				outerElement.setAttribute('class','bb-bb10-image-list');
				hideImages = outerElement.hasAttribute('data-bb-images') ? (outerElement.getAttribute('data-bb-images').toLowerCase() == 'none') : false;
				if (!hideImages) {
					imageEffect = outerElement.hasAttribute('data-bb-image-effect') ? outerElement.getAttribute('data-bb-image-effect').toLowerCase() : undefined;
					imagePlaceholder = outerElement.hasAttribute('data-bb-image-placeholder') ? outerElement.getAttribute('data-bb-image-placeholder') : undefined;
				}
				
				// Assign our context menu if there is one
				if (outerElement.hasAttribute('data-bb-context') && outerElement.getAttribute('data-bb-context').toLowerCase() == 'true') {
					contextMenu = bb.screen.contextMenu;
				}
				// Gather our inner items
				items = outerElement.querySelectorAll('[data-bb-type=item], [data-bb-type=header]');
				for (j = 0; j < items.length; j++) {
					innerChildNode = items[j];
					if (innerChildNode.hasAttribute('data-bb-type')) {
						// Figure out the type of item
						var type = innerChildNode.getAttribute('data-bb-type').toLowerCase(),
							description = innerChildNode.innerHTML,
							title,
							accentText,
							img,
							details,
							descriptionDiv;
						
						if (type == 'header') {
							// Set our normal and highlight styling
							normal = 'bb-bb10-image-list-header bb10Accent bb-bb10-image-list-header-'+res;
							highlight = 'bb-bb10-image-list-header bb10Highlight bb-bb10-image-list-header-'+res;
							// Check for alignment
							if (innerChildNode.hasAttribute('data-bb-justify')) {
								if (innerChildNode.getAttribute('data-bb-justify').toLowerCase() == 'left') {
									normal = normal + ' bb-bb10-image-list-header-left-'+res;
									highlight = highlight + ' bb-bb10-image-list-header-left-'+res;
								} else if (innerChildNode.getAttribute('data-bb-justify').toLowerCase() == 'right') {
									normal = normal + ' bb-bb10-image-list-header-right-'+res;
									highlight = highlight + ' bb-bb10-image-list-header-right-'+res;
								} else {
									normal = normal + ' bb-bb10-image-list-header-center';
									highlight = highlight + ' bb-bb10-image-list-header-center';
								}
							} else {
								normal = normal + ' bb-bb10-image-list-header-center';
								highlight = highlight + ' bb-bb10-image-list-header-center';
							}
							
							// Set our styling
							innerChildNode.normal = normal;
							innerChildNode.highlight = highlight;
							innerChildNode.innerHTML = '<p>'+ description +'</p>';
							innerChildNode.setAttribute('class', normal);
							innerChildNode.ontouchstart = function () {
															this.setAttribute('class', this.highlight);
														}
							innerChildNode.ontouchend = function () {
															this.setAttribute('class',this.normal);
														}
						}
						else if (type == 'item') {
							normal = 'bb-bb10-image-list-item bb-bb10-image-list-item-' + bb.screen.listColor + ' bb-bb10-image-list-item-' + res;
							highlight = normal + ' bb-bb10-image-list-item-hover bb10Highlight';
							innerChildNode.normal = normal;
							innerChildNode.highlight = highlight;
							innerChildNode.setAttribute('class', normal);
							innerChildNode.innerHTML = '';
							// Create our image
							if (!hideImages) {
								img = document.createElement('img');
								if (imagePlaceholder) {
									img.placeholder = imagePlaceholder;
									img.src = innerChildNode.hasAttribute('data-bb-img') ? innerChildNode.getAttribute('data-bb-img') : imagePlaceholder;
								} else {
									img.setAttribute('src',innerChildNode.getAttribute('data-bb-img'));
								}
								innerChildNode.appendChild(img);
								
								if (imageEffect) {
									img.style.opacity = '0.0';
									img.even = (j%2 == 0)
									img.onload = function() {
													this.show();
												};
									img.show = function() {
													this.style.opacity = '1.0';
													if (this.even) { // Change timing based on even and odd numbers for some randomness
														this.style['-webkit-transition'] = 'opacity 0.5s linear';
													} else {
														this.style['-webkit-transition'] = 'opacity 1.0s linear';
													}
													this.style['-webkit-backface-visibility'] = 'hidden';
													this.style['-webkit-perspective'] = 1000;
													this.style['-webkit-transform'] = 'translate3d(0,0,0)';
												};
									img.show = img.show.bind(img);
								}
								// Handle the error scenario
								if (imagePlaceholder) {
									img.onerror = function() {
													if (this.src == this.placeholder) return;
													this.src = this.placeholder;
													if (imageEffect) {
														this.show();
													}
												};
								}
							}
							// Create the details container
							details = document.createElement('div');
							if (hideImages) {
								details.setAttribute('class','bb-bb10-image-list-item-details-'+res+' bb-bb10-image-list-item-noimage-'+res);
							} else {
								details.setAttribute('class','bb-bb10-image-list-item-details-'+res);
							}
							innerChildNode.appendChild(details);
							// Create our title
							title = document.createElement('div');
							title.setAttribute('class','title');
							title.innerHTML = innerChildNode.getAttribute('data-bb-title');
							details.appendChild(title);
							// Create the accent text
							if (innerChildNode.hasAttribute('data-bb-accent-text')) {
								accentText = document.createElement('div');
								accentText.setAttribute('class','accent-text');
								accentText.innerHTML = innerChildNode.getAttribute('data-bb-accent-text');
								details.appendChild(accentText);
							}
							// Create our description
							descriptionDiv = document.createElement('div');
							descriptionDiv.setAttribute('class','description');
							descriptionDiv.innerHTML = description;
							details.appendChild(descriptionDiv);
							// Clean-up
							innerChildNode.removeAttribute('data-bb-img');
							innerChildNode.removeAttribute('data-bb-title');
							// Set up our variables
							innerChildNode.fingerDown = false;
							innerChildNode.contextShown = false;
							innerChildNode.contextMenu = contextMenu;
							innerChildNode.description = description;
							innerChildNode.title = title.innerHTML;
							innerChildNode.ontouchstart = function () {
															this.setAttribute('class',this.highlight);
															innerChildNode.fingerDown = true;
															innerChildNode.contextShown = false;
															if (innerChildNode.contextMenu) {
																window.setTimeout(this.touchTimer, 667);
															}
														};
							innerChildNode.ontouchend = function (event) {
															this.setAttribute('class',this.normal);
															innerChildNode.fingerDown = false;
															if (innerChildNode.contextShown) {
																event.preventDefault();
																event.stopPropagation();
															}
														};
							innerChildNode.touchTimer = function() {
															if (innerChildNode.fingerDown) {
																innerChildNode.contextShown = true;
																innerChildNode.contextMenu.peek({title:this.title,description:this.description, selected: this});
															}
														};
							innerChildNode.touchTimer = innerChildNode.touchTimer.bind(innerChildNode);
						}
					}
				}
			}		
		}
		else {
			// Apply our transforms to all Image Lists
			for (var i = 0; i < elements.length; i++) {
				var inEvent, 
					outEvent, 
					outerElement = elements[i],
					imagePlaceholder,
					hideImages = outerElement.hasAttribute('data-bb-images') ? (outerElement.getAttribute('data-bb-images').toLowerCase() == 'none') : false;
					
				if (!hideImages) {
					imagePlaceholder = outerElement.hasAttribute('data-bb-image-placeholder') ? outerElement.getAttribute('data-bb-image-placeholder') : undefined;
				}
				// Set our highlight events
				if (bb.device.isPlayBook) {
					inEvent = 'ontouchstart';
					outEvent = 'ontouchend';
				} else {
					inEvent = 'onmouseover';
					outEvent = 'onmouseout';
				}
				if (bb.device.isHiRes) {
					outerElement.setAttribute('class','bb-hires-image-list');
				} else {
					outerElement.setAttribute('class','bb-lowres-image-list');
				}
				// Gather our inner items
				var items = outerElement.querySelectorAll('[data-bb-type=item], [data-bb-type=header]'),
					innerChildNode,
					type,
					j,
					description,
					accentText,
					normal,
					highlight,
					details,
					titleDiv,
					descriptionDiv,
					accentDiv,
					img,
					res = (bb.device.isHiRes) ? 'hires' : 'lowres';
					
				for (j = 0; j < items.length; j++) {
					innerChildNode = items[j];
					if (innerChildNode.hasAttribute('data-bb-type')) {
						type = innerChildNode.getAttribute('data-bb-type').toLowerCase();
						description = innerChildNode.innerHTML;
						accentText = '';
						
						// Grab the accent-text if it is there
						if (innerChildNode.hasAttribute('data-bb-accent-text')) {
							accentText = innerChildNode.getAttribute('data-bb-accent-text');
						}
						
						if (type == 'header') {
							normal = 'bb-'+res+'-image-list-header';
							highlight = 'bb-'+res+'-image-list-header-hover';
							// Check for alignment
							if (innerChildNode.hasAttribute('data-bb-justify')) {
								if (innerChildNode.getAttribute('data-bb-justify').toLowerCase() == 'left') {
									normal = normal + ' bb-'+res+'-image-list-header-left';
									highlight = highlight + ' bb-'+res+'-image-list-header-left';
								} else if (innerChildNode.getAttribute('data-bb-justify').toLowerCase() == 'right') {
									normal = normal + ' bb-'+ res+'-image-list-header-right';
									highlight = highlight + ' bb-'+res+'-image-list-header-right';
								} else {
									normal = normal + ' bb-'+res+'-image-list-header-center';
									highlight = highlight + ' bb-'+res+'-image-list-header-center';
								}
							} else {
								normal = normal + ' bb-'+res+'-image-list-header-center';
								highlight = highlight + ' bb-'+res+'-image-list-header-center';
							}
							// Set our styling
							innerChildNode.normal = normal;
							innerChildNode.highlight = highlight;
							innerChildNode.innerHTML = '<p>'+ description +'</p>';
							innerChildNode.setAttribute('x-blackberry-focusable','true');
							innerChildNode.setAttribute('class', normal);
							innerChildNode.setAttribute(inEvent, "this.setAttribute('class',this.highlight)");
							innerChildNode.setAttribute(outEvent, "this.setAttribute('class',this.normal)");
						} 
						else if (type == 'item') {
							innerChildNode.innerHTML = '';
							innerChildNode.setAttribute('class', 'bb-'+res+'-image-list-item');
							innerChildNode.setAttribute(inEvent, "this.setAttribute('class','bb-"+res+"-image-list-item-hover')");
							innerChildNode.setAttribute(outEvent, "this.setAttribute('class','bb-"+res+"-image-list-item')");
							innerChildNode.setAttribute('x-blackberry-focusable','true');
							
							if (!hideImages) {
								img = document.createElement('img');
								if (imagePlaceholder) {
									img.placeholder = imagePlaceholder;
									img.src = innerChildNode.hasAttribute('data-bb-img') ? innerChildNode.getAttribute('data-bb-img') : imagePlaceholder;
									img.onerror = function() {
													if (this.src == this.placeholder) return;
													this.src = this.placeholder;
												};
								} else {
									img.setAttribute('src',innerChildNode.getAttribute('data-bb-img') );
								}
								innerChildNode.appendChild(img);
							}
							
							details = document.createElement('div');
							innerChildNode.appendChild(details);
							if (hideImages) {
								details.setAttribute('class','bb-'+res+'-image-list-details bb-'+res+'-image-list-noimage');
							} else {
								details.setAttribute('class','bb-'+res+'-image-list-details');
							}
							
							titleDiv = document.createElement('div');
							titleDiv.innerHTML = innerChildNode.getAttribute('data-bb-title');
							titleDiv.className = 'title';
							details.appendChild(titleDiv);
							accentDiv = document.createElement('div');
							accentDiv.innerHTML = accentText;
							accentDiv.className = 'accent-text';
							details.appendChild(accentDiv);
							descriptionDiv = document.createElement('div');
							descriptionDiv.innerHTML = description;
							descriptionDiv.className = 'description';
							details.appendChild(descriptionDiv);
							
							innerChildNode.removeAttribute('data-bb-img');
							innerChildNode.removeAttribute('data-bb-title');
						}
					}
				}
			}
		}
    }