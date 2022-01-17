function() {
			if ( $.data( this, "destroy.tabs" ) ) {
				$( this ).remove();
			} else {
				$( this ).removeClass([
					"ui-state-default",
					"ui-corner-top",
					"ui-tabs-active",
					"ui-state-active",
					"ui-state-disabled",
					"ui-tabs-panel",
					"ui-widget-content",
					"ui-corner-bottom"
				].join( " " ) );
			}
		}