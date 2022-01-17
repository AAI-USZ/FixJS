function( element ) {
			// Make existing spans with language attribute visible
			// Flags can be added via the metaview plugin
			jQuery( element ).css(
				'background-image',
				'url(' + Aloha.getPluginUrl( 'wai-lang' ) + '/img/flags/' +
					jQuery( element ).attr( 'lang' ) + '.png)'
			);
			jQuery( element ).addClass( WAI_LANG_CLASS );
		}