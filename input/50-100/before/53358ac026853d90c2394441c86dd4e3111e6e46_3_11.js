function( obj ) {
			obj.find( 'span[lang]' ).each( function() {
				jQuery( this ).removeClass( WAI_LANG_CLASS );
			} );
		}