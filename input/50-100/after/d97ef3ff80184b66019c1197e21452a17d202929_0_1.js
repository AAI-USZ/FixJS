function( up, file )
		{
			var $uploaded = $( '#' + this.settings.container + ' .rwmb-uploaded' ),
				$uploaded_title = $( '#' + this.settings.container + ' .rwmb-uploaded-title' );

			// Update the loading div
			$( 'div.rwmb-image-uploading-bar', 'li#' + file.id ).css( 'height', file.percent + '%' );

			// Show them all
			$uploaded.removeClass( 'hidden' );
			$uploaded_title.removeClass( 'hidden' );
		}