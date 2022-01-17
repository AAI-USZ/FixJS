function insertInput(element) {
	   var value = element.html();
	   var width = element.width();
	   var input = $('<input style="width:90%; type="text" value="'+value+'"/>');
	   var field = $(element).attr('data-field');
	   
	   // To prvent another form being added
	   // stop the double click event from being propigated
	   input.dblclick(function(event){event.stopPropagation();});
	   
	   //Add popover instructions
	   input.popover({
			   placement:'bottom',
			   title:'Instructions',
			   content:'<p>Press <code>Enter</code> to submit the new data.</p><p>Press <code>Shift + Enter</code> or <code>Esc</code> to cancel.</p>'
	   });
	   
	   input.keypress(function(event){
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
			   //element.css('padding','');
		   };
	   });
		  
	  element.contents().remove();
	  //element.css('padding','0px 5px');
	  //element.css('width','90%');
	  element.append(input);	  
	  element.children('input').focus();
   }