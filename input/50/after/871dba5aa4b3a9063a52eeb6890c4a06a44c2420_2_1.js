function () {
			// Make sure that we only deactivate tables in obj which have the
			// same id as tables which have been activated and registered
			if ( that.getTableFromRegistry( this ) ) {
				( new Table( this, that ) ).deactivate();
				// remove the id attribute
				jQuery(this).attr('id', null);
			}
		}