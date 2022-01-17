function addNewImageDropBox ( $div ) {
			$.log('Add new CAA image space button triggered.');
			
			$div = $div.append ? $div : $.single( $div.target ).nextAll( '.caaDiv' );
			$div.append( INNERCONTEXT.UI.$makeDropbox() );
			INNERCONTEXT.UTILITY.checkScroll( $div );
		}