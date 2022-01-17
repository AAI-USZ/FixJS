function() {
			var tabs = this.list.children();
			if ( 0 === tabs.length ) {
				return;
			}
			this.handle.hide();
			this.visible = false;

			// If the tab we just hid was the selected tab, then we need to
			// select another tab in its stead.  We will select the first
			// visible tab we find, or else we deselect all tabs.
			if ( this.index === this.container.tabs( 'option', 'selected' ) ) {
				tabs = this.container.data( 'aloha-tabs' );

				var i;
				for ( i = 0; i < tabs.length; ++i ) {
					if ( tabs[ i ].visible ) {
						this.container.tabs( 'select', i );n
						return;
					}
				}

				// This does not work...
				// this.container.tabs( 'select', -1 );

				this.handle.removeClass( 'ui-tabs-active' );
			}
		}