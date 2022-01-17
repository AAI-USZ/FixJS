function() {
			var validationFailed = 0;
			// We operate under the assumption that we only want to validate the
			// length of the "required" fields to be non zero.
			// To do this, every field we wish to validate should be a member of the 
			// css class "required".
			// The following blurb will find all such elements and verify there length
			// to be 0.
			// WARNING: Only attach the tag to fields that contain a value with a 
			// length property.
			
			if( $('#manual_upload').attr('checked') == 'checked' ){
			    $(document).find('.required').each(function( i, key ) {
				    if( $(key).attr('value').length == 0)
					    validationFailed = 1;
			    });
		
			    if( validationFailed ) {
				    $('#error_rows').text('Please fill out at least one value from each row').show().css('color', 'red');
			    }
			    
			    // Only do the following if we are on the Upload page. Otherwise
    			// this doesn't make sense.
    			else if(formID == "#upload_form")
    				readyUploadForm();
    			else 
    				$(document).find('form')[0].submit();
			} else {
			    if(formID == "#upload_form")
    				readyUploadForm();
    			else 
    				$(document).find('form')[0].submit();
			}

			}