function() {
        var $input = $(this),
        fieldValue = $.trim($input.val()),
        labelText = $input.parent().prev().text(),
        errorMsg;
        
        //Check if it's empty or an invalid email
        if(fieldValue === '') {
          errorMsg = _('errorText') || opts.errorText;
	  valid = false;
        } else if($input.hasClass('email')) {
	  if(!(/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(fieldValue))) {
	    errorMsg = _('emailErrorText') || opts.emailErrorText;
	    valid = false;
	  }
        }
        
        //If there is an error, display it
        if(errorMsg) {
          errorMsg = errorMsg.replace('{label}',labelText);
          $input.parent()
            .addClass(opts.errorClass)
            .error('show', errorMsg);
        }
      }