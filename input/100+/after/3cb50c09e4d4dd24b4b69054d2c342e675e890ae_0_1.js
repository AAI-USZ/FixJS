function(){

		var append_text = '';
		var $details = $('#problem_details');
		var details = $details.val();
		var temp_value = '';

		$('#checklists ul:visible li > select,#checklists ul:visible li > input,#checklists ul:visible li > textarea').each(function(){
			temp_value = getValue( $(this), 1 );
			if( append_text !== '' && temp_value) {
				append_text = append_text + "\r";
			}//end if
			append_text = append_text + temp_value;
		});

		if( $.trim( append_text ) != '' ) {
			append_text = "*****************\rTicket Details (" + $('select[name=checklist] option:selected').html() + "):\r------------------\r" + append_text + "\r*****************";
			if( $.trim( $details.val() ) != '' ) {
				append_text = "\r\r" + append_text;
			}//end if
		} else if( $('#new_call').length > 0 ) {
			if( !confirm( 'You haven\'t answered the provided questions about your ticket. Are you sure you wish to submit the call?') ) {
				return false;
			}//end if
		}//end else

		if( $.trim( details ) == '' ) {
			if( !confirm('You have not filled out a problem description. Do you still want to submit the call?') ) {
				return false;
			}//end if
		}//end if

		$details.val( $details.val() + append_text );
		return true;
	}