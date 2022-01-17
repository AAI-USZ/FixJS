function() {
        var $input = $(this),
        fieldValue = $.trim($input.val()),
        labelText = $input.siblings('label').text().replace(opts.removeLabelChar, ''),
        errorMsg = '';
        
        //Check if it's empty or an invalid email
        if(fieldValue === '') {
	  errorMsg = hasLabelPlaceholder ? errorMsg = opts.errorText.replace('{label}',labelText) : errorMsg = opts.errorText;
	  valid = false;
        } else if($input.hasClass('email')) {
	  if(!(/^([_a-z0-9-]+)(\.[_a-z0-9-]+)*@([a-z0-9-]+)(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(fieldValue))) {
	    errorMsg = hasLabelPlaceholder ? errorMsg = opts.emailErrorText.replace('{label}',labelText) : errorMsg = opts.emailErrorText;
	    valid = false;
	  }
        }
        
        //If there is an error, display it
        if(errorMsg !== '') {
          $input.parent().addClass(opts.errorClass);
	  //$input.addClass(opts.inputErrorClass).after('<'+opts.errorElement+' class="'+opts.errorClass+'">' + errorMsg + '</'+opts.errorElement+'>');
        }
      }