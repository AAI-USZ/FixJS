function addImageRows () {
				$.single( this ).find( 'a' )
				                 .filter( '[resource^="[mbz:release/"]' )
				                 .each( INNERCONTEXT.UI.addImageRow );
			}