function( up, file )
		{
			// Update the loading div
			$( 'div.rwmb-image-uploading-bar', 'li#' + file.id ).css( 'height', file.percent + '%' );
		}