function (e) {
	        	
	        	// preventing clicks on the dashboard after some icon was already clicked
	        	if ( feri.dashboardActive == false )
	        		return;
	        	else
	        		feri.dashboardActive = false;
	        	
	        	// feedback on the icon when clicked 
	        	icon.imageActive = 'undefined';
	        	view.backgroundImage = icon.imageActive;
	        	
	        	var ind = Titanium.UI.createActivityIndicator({
	        		width: 50,
	        		height: 50,
	        		message: ''
	        	});
	        	if ( feri.isAndroid() )
	        		ind.message = 'Nalagam ...';
	        	view.add(ind);
	        	ind.show();
	        	
	        	feri.iconWin = icon.func(icon.args);
	            
	            // add a left navigation button for ios
	            if (!feri.isAndroid()) {
	                var leftButton = Ti.UI.createButton({
	                    backgroundImage: '/images/6dots.png',
	                    width: 41,
	                    height: 30
	                });
	                leftButton.addEventListener('click', function () {
	                    feri.navGroup.close(feri.iconWin, {
	                        animated: true
	                    });
	                    // re-enabling the icons on the dashboard
	                    feri.dashboardActive = true;
	                });
	                feri.iconWin.leftNavButton = leftButton;
	            }
				
				// adding refresh icon click
	            if (icon.refresh) {
	                if (feri.isAndroid()) {
	                    
	                } else {
	                    var rightButton = Ti.UI.createButton({
	                        systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	                    });
	                    feri.iconWin.rightNavButton = rightButton;
	                    rightButton.addEventListener('click', function () {
	                        if ( icon.name == 'board' )
	                        	Ti.fireEvent('feri:update_data_oglasna');
	                        else if ( icon.name == 'people' )
	                        	Ti.fireEvent('feri:update_data_zaposleni');
	                        else if ( icon.name == 'diplome' )
	                        	Ti.fireEvent('feri:update_data_diplome');
	                    });
	                }
	            }
	            
	            // add sessions and speaker refresh 
	            if (icon.urniki) {
                    var rightButton = Ti.UI.createButton({
                        systemButton: Ti.UI.iPhone.SystemButton.BOOKMARKS
                    });
                    feri.iconWin.rightNavButton = rightButton;
                    rightButton.addEventListener('click', function () {
                        Ti.fireEvent('feri:set_urniki');
                    });
	            }
	            
	            if (icon.badgeReset) {
	            	Titanium.UI.iPhone.setAppBadge(0);
	            }
	
	            feri.iconWin.navBarHidden = false;
	            feri.navGroup.open(feri.iconWin, {
	                animated: true
	            });
	            
	            // bring the icon back
	            ind.hide();
	            view.backgroundImage = icon.image;
	        }