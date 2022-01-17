function ( event, rangeObject ) {
				var config;

				// show/hide the button according to the configuration
				config = that.getEditableConfig( Aloha.activeEditable.obj );
				if ( jQuery.inArray( 'a', config ) != -1 ) {
					that.formatLinkButton.show();
					that.insertLinkButton.show();
					FloatingMenu.hideTab = false;
				} else {
					that.formatLinkButton.hide();
					that.insertLinkButton.hide();
					FloatingMenu.hideTab = i18n.t( 'floatingmenu.tab.link' );
				}
			}