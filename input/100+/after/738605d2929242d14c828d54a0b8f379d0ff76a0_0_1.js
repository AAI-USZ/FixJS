function(elements) {
        for (var i = 0; i < elements.length; i++) {
            var outerElement = elements[i];
            if (bb.device.isHiRes) {
                outerElement.setAttribute('class', 'bb-hires-screen');
            }
            
            if (bb.device.isPlayBook()) {
                outerElement.style.height = window.innerHeight;
                outerElement.style.width = window.innerWidth;
                outerElement.style.overflow = 'auto';
                //alert(bb.screens.length);
				//TODO: check for menu, create it if found create
				var menuBar = outerElement.querySelectorAll('[data-bb-type=menu]');
				if (menuBar.length > 0) {
					menuBar = menuBar[0];
					//TODO: create menu shell
					//TODO: find all menu items
					//TODO: for each menu item check for image, function and text
					//TODO: add menu item to menu bar, remove from page
				}

                var titleBar = outerElement.querySelectorAll('[data-bb-type=title]');

				if (titleBar.length > 0) {
                    titleBar = titleBar[0];
                    
                    // Create our scrollable <div>
                    var scrollArea = document.createElement('div');
                    scrollArea.setAttribute('style','overflow:auto;bottom:0px;position:absolute;top:55px;left:0px;right:0px;');
                    outerElement.appendChild(scrollArea);
                    // Copy all nodes that are not the title bar
                    var tempHolder = [],
                        childNode = null, 
                        j;
                    for (j = 0; j < outerElement.childNodes.length - 1; j++) {
                        childNode = outerElement.childNodes[j];
                        if (childNode != titleBar && childNode != menuBar) {
                            tempHolder.push(childNode);
                        }
                    }
                    // Add them into the scrollable area
                    for (j = 0; j < tempHolder.length -1; j++) {
                        scrollArea.appendChild(tempHolder[j]);
                    }
                    
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
            }
            else {
                // See if there is a title bar
                var titleBar = outerElement.querySelectorAll('[data-bb-type=title]');
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

				if(blackberry && blackberry.ui && blackberry.ui.menu){
					var menuBar = outerElement.querySelectorAll('[data-bb-type=menu]');
					if (menuBar.length > 0) {
						menuBar = menuBar[0];
						var items = menuBar.getElementsByTagName('div');
						for (var j = 0; j < items.length; j++) {
							if(items[j].getAttribute('data-bb-type') === "menu-item"){
								var item = new blackberry.ui.menu.MenuItem(false, j, items[j].innerHTML, items[j].onclick);
								blackberry.ui.menu.addMenuItem(item);
								if(items[j].hasAttribute('data-bb-selected') && items[j].getAttribute('data-bb-selected') === "true"){
									blackberry.ui.menu.setDefaultMenuItem(item);
								}
							}else if(items[j].getAttribute('data-bb-type') === "menu-separator"){
								var item = new blackberry.ui.menu.MenuItem(true, j);
								blackberry.ui.menu.addMenuItem(item);
							}else{
								console.log('invalid menu item type');
							}
						}
						menuBar.parentNode.removeChild(menuBar);
					}
				}else{
					console.log('blackberry.ui.menu must be enabled to setup a menu');
				}
            }
        }
    }