function(elements) {
		var screenRes,
			outerElement;
		// Reset our context Menu
		bb.screen.contextMenu = null;
		
		if (bb.device.isBB10 && bb.device.isPlayBook) {
			screenRes = 'bb-hires-screen';
		} else if (bb.device.isBB10) {
			screenRes = 'bb-bb10-hires-screen';
		} else if (bb.device.isHiRes) {
			screenRes = 'bb-hires-screen';
		}
		
        for (var i = 0; i < elements.length; i++) {
            outerElement = elements[i];
            
			// Set our screen resolution
			outerElement.setAttribute('class', screenRes);
            		
			//check to see if a menu/menuBar needs to be created
			var menuBar = outerElement.querySelectorAll('[data-bb-type=menu]');
			if (menuBar.length > 0) {
				menuBar = menuBar[0];
				bb.menuBar.apply(menuBar,outerElement);
			}
           
            if (bb.device.isBB10) {
				
                var titleBar = outerElement.querySelectorAll('[data-bb-type=title]'),
					actionBar = outerElement.querySelectorAll('[data-bb-type=action-bar]'),
					context = outerElement.querySelectorAll('[data-bb-type=context-menu]'),
					outerScrollArea,
					scrollArea,
					tempHolder = [],
					childNode = null, 
					j;
				
				// Figure out what to do with the title bar
                if (titleBar.length > 0) {
					titleBar = titleBar[0];
					// See if they want a back button
					if (titleBar.hasAttribute('data-bb-back-caption')) {
						if (actionBar.length == 0) {
							// Since there's no way to get back, we'll add an action bar
							var newBackBar = document.createElement('div');
							newBackBar.setAttribute('data-bb-type','action-bar');
							newBackBar.setAttribute('data-bb-back-caption',titleBar.getAttribute('data-bb-back-caption'));
							outerElement.appendChild(newBackBar);
							actionBar = [newBackBar];
						}
					}
					// TODO: Add title bar support
					outerElement.removeChild(titleBar);
				}
				
				// Assign our action bar
				if (actionBar.length > 0) {
                    actionBar = actionBar[0]; 
				} else {
					actionBar = null;
				}
                
				// Create our scrollable <div>
				outerScrollArea = document.createElement('div'); 
				outerElement.appendChild(outerScrollArea);
				// Turn off scrolling effects if they don't want them
				if (!outerElement.hasAttribute('data-bb-scroll-effect') || outerElement.getAttribute('data-bb-scroll-effect').toLowerCase() != 'off') {
					outerScrollArea.setAttribute('id','bbUIscrollWrapper'); 
				}
				
				// Inner Scroll Area
				scrollArea = document.createElement('div');
				outerScrollArea.appendChild(scrollArea); 
				
				// Copy all nodes in the screen that are not the action bar
				for (j = 0; j < outerElement.childNodes.length - 1; j++) {
					childNode = outerElement.childNodes[j];
					if ((childNode != actionBar) && (childNode != menuBar)) {
						tempHolder.push(childNode);
					}
				}
				// Add them into the scrollable area
				for (j = 0; j < tempHolder.length -1; j++) {
					scrollArea.appendChild(tempHolder[j]);
				}
				
				if (actionBar) {
					if (bb.device.isPlayBook) {
						outerScrollArea.setAttribute('style','overflow:auto;position:absolute;bottom:73px;top:0px;left:0px;right:0px;');
					} else {
						outerScrollArea.setAttribute('style','overflow:auto;position:absolute;bottom:140px;top:0px;left:0px;right:0px;');
					}
					bb.actionBar.apply(actionBar,outerElement);
                }
				else {
					outerScrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:0px;left:0px;right:0px;');
				}
				
				// Assign our context
				if (context.length > 0) {
                    bb.screen.processContext(context[0], outerElement);
				} else {
					context = null;
				}
			} 
			else if (bb.device.isPlayBook) {
                var titleBar = outerElement.querySelectorAll('[data-bb-type=title]'),
					outerScrollArea,
					scrollArea,
					tempHolder = [],
					childNode = null, 
					j,
					actionBar = outerElement.querySelectorAll('[data-bb-type=action-bar]'),
					context = outerElement.querySelectorAll('[data-bb-type=context-menu]');				
				
				// Remove any BB10 context menus or action bars from sight
				for (j = 0; j < actionBar.length; j++) {
					actionBar[j].style.display = 'none';
				}
				for (j = 0; j < context.length; j++) {
					context[j].style.display = 'none';
				}
				
                if (titleBar.length > 0) {
                    titleBar = titleBar[0]; }
				else {
					titleBar = null;
				}
				
				// Create our scrollable <div>
				outerScrollArea = document.createElement('div'); 
				outerElement.appendChild(outerScrollArea);
				// Turn off scrolling effects if they don't want them
				if (!outerElement.hasAttribute('data-bb-scroll-effect') || outerElement.getAttribute('data-bb-scroll-effect').toLowerCase() != 'off') {
					outerScrollArea.setAttribute('id','bbUIscrollWrapper'); 
				}
				// Inner Scroll Area
				scrollArea = document.createElement('div');
				outerScrollArea.appendChild(scrollArea); 
				
				// Copy all nodes that are not the title bar
				for (j = 0; j < outerElement.childNodes.length - 1; j++) {
					childNode = outerElement.childNodes[j];
					if (childNode != titleBar) {
						tempHolder.push(childNode);
					}
				}
				// Add them into the scrollable area
				for (j = 0; j < tempHolder.length -1; j++) {
					scrollArea.appendChild(tempHolder[j]);
				}
                   
				if (titleBar) {
					outerScrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:55px;left:0px;right:0px;');					
                    titleBar.setAttribute('class', 'pb-title-bar');
                    titleBar.innerHTML = titleBar.getAttribute('data-bb-caption');
                    if (titleBar.hasAttribute('data-bb-back-caption')) {
                        var button = document.createElement('div'), 
                            buttonInner = document.createElement('div');
                        button.setAttribute('class', 'pb-title-bar-back');
                        button.onclick = bb.popScreen;
                        buttonInner.setAttribute('class','pb-title-bar-back-inner');
                        buttonInner.innerHTML = titleBar.getAttribute('data-bb-back-caption'); 
                        button.appendChild(buttonInner);
                        titleBar.appendChild(button);
                    }
                }
				else {
					outerScrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:0px;left:0px;right:0px;');
				}
            }
            else {
                // See if there is a title bar
                var titleBar = outerElement.querySelectorAll('[data-bb-type=title]'),
					actionBar = outerElement.querySelectorAll('[data-bb-type=action-bar]'),
					context = outerElement.querySelectorAll('[data-bb-type=context-menu]');		
									
				
				// Remove any BB10 context menus or action bars from sight
				for (j = 0; j < actionBar.length; j++) {
					actionBar[j].style.display = 'none';
				}
				for (j = 0; j < context.length; j++) {
					context[j].style.display = 'none';
				}
				
				
                if (titleBar.length > 0) {
                    titleBar = titleBar[0];
                    if (titleBar.hasAttribute('data-bb-caption')) {
                        var outerStyle = outerElement.getAttribute('style');
                        if (bb.device.isHiRes) {
                            titleBar.setAttribute('class', 'bb-hires-screen-title');
                            outerElement.setAttribute('style', outerStyle + ';padding-top:33px');
                        } else {
                            titleBar.setAttribute('class', 'bb-lowres-screen-title');
                            outerElement.setAttribute('style', outerStyle + ';padding-top:27px');
                        }
                        titleBar.innerHTML = titleBar.getAttribute('data-bb-caption');
                    }
                }
            }
        }
    }