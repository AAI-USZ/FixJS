function() {
				menuWidthCheck();
				
				if (!mobile) {
					menu.show();
					searchBar.show();
				}
				else {
					if (changed) {
						menu.hide();
						searchBar.hide();	
					}
				}
			}