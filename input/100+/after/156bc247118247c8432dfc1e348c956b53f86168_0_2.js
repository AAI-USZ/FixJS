function handleDroppedResources (e) {
			e = e.originalEvent || e;
			e.preventDefault(); // This has to be done before anything else.

			var $util        = INNERCONTEXT.UTILITY
			  , dataTransfer = e.dataTransfer
			  , textData     = dataTransfer.getData( 'Text' )
			  ;

			$.single(this).removeClass( 'over' ); // clear the drop highlight

			var dropped = { file_list : dataTransfer.files
			              , base      : $( textData ).find( 'base' ).attr( 'href' ) || ''
			              , text      : textData.match( INNERCONTEXT.CONSTANTS.REGEXP.uri ) || ''
			              , uri       : dataTransfer.getData( 'text/uri-list' )
			              , e         : e
			              };

			$.log(dropped);
			$util.handleURIs( dropped );
		}