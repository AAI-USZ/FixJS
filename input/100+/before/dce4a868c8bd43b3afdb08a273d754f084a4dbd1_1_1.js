function(fileKey) {
				$("#upload-progress-state").html(mw.msg("upload-progress-in-progress"));
				api.finishUpload(fileKey, fileName, 'Uploaded via WLM Mobile App', 'Testing WLM').done(function(imageinfo) {
					$( '#upload-latest-page img' ).attr( 'src', imageinfo.url );
					$( '#upload-latest-page .share' ).html( mw.msg( 'upload-latest-view' ) );
					$( '#upload-latest-page .share a' ).attr( 'href', imageinfo.descriptionurl );
					goBack(); // undo back button to skip upload progress page
					goBack(); // undo back button to skip upload form
					showPage( 'upload-latest-page' );
				});
			}