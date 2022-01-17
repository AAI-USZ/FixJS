function(event){
		   //If the enter key is hit, prevent the form from being submitted
		   if(event.keyCode == 13 || event.keyCode == 27) {
			   event.preventDefault();  
			   //If Shift+Enter or Escape is pressed, cancel the form
			   //and return previous value
			   if(event.keyCode == 13 && event.shiftKey || event.keyCode == 27) {
				   $(this).parent('.editable').append(value);
			   //If Enter is pressed, update the value
			   } else if(event.keyCode == 13) {
				   var new_value = $(this).val();
				   var result = postData(field,new_value);
				   
				   if(result){
					   //If the updated is successful, update the value
					   $(this).parent('.editable').append(new_value);   
				   } else {
					   //if not, then return to the original value
					   $(this).parent('.editable').append(value);
					   alert("Uh oh! Looks like there was an error submitting that update!");
				   }
			   }
			   //Make sure the popover is hidden
			   $(this).popover('hide');
			   //Make the editable div editable again
			  // editable($(this).parent('.editable'));
			   //remove the input tag
			   $(this).remove();
			   element.css('padding','');
		   };
	   }