function(elements) {
		var screenRes,
			outerElement;
		// Reset our context Menu
		bb.screen.contextMenu = null;
		
		if (bb.device.isBB10 && bb.device.isPlayBook) {
			screenRes = 'bb-bb10-lowres-screen';
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
					j,
					height = (bb.device.isPlayBook) ? 73 : 140;
				
				// Figure out what to do with the title bar
                if (titleBar.length > 0) {
					titleBar = titleBar[0];
				} else {
					titleBar = null;
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
					if ((childNode != actionBar) && (childNode != menuBar) && (childNode != titleBar)) {
						tempHolder.push(childNode);
					}
				}
				// Add them into the scrollable area
				for (j = 0; j < tempHolder.length -1; j++) {
					scrollArea.appendChild(tempHolder[j]);
				}
				
				// Set our outer scroll area dimensions
				if (titleBar && actionBar) {
					outerScrollArea.setAttribute('style','overflow:auto;position:absolute;bottom:'+height+'px;top:'+height+'px;left:0px;right:0px;');
				} else if (titleBar) {
					outerScrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:'+height+'px;left:0px;right:0px;');
				} else if (actionBar) {
					outerScrollArea.setAttribute('style','overflow:auto;position:absolute;bottom:'+height+'px;top:0px;left:0px;right:0px;');
				} else {
					outerScrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:0px;left:0px;right:0px;');
				}
				
				// Apply any title bar styling
				if (titleBar) {		
					bb.titleBar.apply(titleBar);
                }
				
				// Apply any action Bar styling
				if (actionBar) {
					bb.actionBar.apply(actionBar,outerElement);
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
                    bb.titleBar.apply(titleBar);
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
                    bb.titleBar.apply(titleBar);
                }
            }
        }
    }