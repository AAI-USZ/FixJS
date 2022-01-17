function showPhotoConfirmation(fileUrl) {
		var comment = 'Uploaded via WLM Mobile App';
		var text = 'Testing WLM';
		var uploadConfirmTemplate = templates.getTemplate('upload-confirm-template');
		var fileName = curMonument.generateFilename();
		console.log("Filename is " + fileName);
		$("#upload-confirm").html(uploadConfirmTemplate({monument: curMonument, fileUrl: fileUrl})).localize();
		$("#confirm-license-text").html(mw.msg('confirm-license-text', api.userName));
		$("#continue-upload").click(function() {
			// reset status message for any previous uploads
			$( '#upload-progress-state' ).html(mw.msg( 'upload-progress-starting' ));
			showPage("upload-progress-page");
			api.startUpload( fileUrl, fileName ).done( function( fileKey, token ) {
				$("#upload-progress-state").html(mw.msg("upload-progress-in-progress"));
				api.finishUpload( fileKey, fileName, comment, text, token ).done(function( imageinfo ) {
					$( '#upload-latest-page img' ).attr( 'src', imageinfo.url );
					$( '#upload-latest-page .share' ).html( mw.msg( 'upload-latest-view' ) );
					$( '#upload-latest-page .share a' ).attr( 'href', imageinfo.descriptionurl );
					goBack(); // undo back button to skip upload progress page
					goBack(); // undo back button to skip upload form
					showPage( 'upload-latest-page' );
				});
			}).fail( function( data ) {
				var code, info;
				if( data.error ) {
					code = data.error.code;
					info = data.error.info;
				}
				$( '#upload-progress-state' ).html( mw.msg( 'upload-progress-failed' ) );
				displayError( code, info );
				console.log( 'Upload failed: ' + code );
			} );
		});
		showPage('upload-confirm-page');
	}