function AddContact()
{
	//remove error classes from possible previous errors
	$('#add_first_name').removeClass('error_input');
	$('#add_last_name').removeClass('error_input');
	$('#add_type').removeClass('error_input');
	$('#add_number').removeClass('error_input');

	//clear previous errors
	$('#errors').html('');
	//error flag, if we have errors don't try and add the new contact
	var errors = false;
	
	//store any error messages we get.
	var error_messages = new Array();

	//get and validate the first name
	var first_name = $('#add_first_name').val();
	if(first_name == "")
	{
		$('#add_first_name').addClass('error_input');
		errors = true;
		error_messages.push("First name is required.");
	}

	//get and validate the last_name
	var last_name = $('#add_last_name').val();
	if(last_name == "")
	{
		$('#add_last_name').addClass('error_input');
		errors = true;
		error_messages.push("Last name is required.");
	}

	//get and validate the type
	var type = $('#add_type').val();
	if(type == "")
	{
		$('#add_type').addClass('error_input');
		errors = true;
		error_messages.push("Type is required.");
	}

	//get and validate the number
	var number = $('#add_number').val();
	if(number == "")
	{
		$('#add_number').addClass('error_input');
		errors = true;
		error_messages.push("Number is required.");
	}

	//no errors, let's add the contact
	if(!errors)
	{
		//build the datastring
		var datastring = 'action=add&first_name='+ first_name + '&last_name=' + last_name + '&type=' + type + '&number=' + number; 

		//add the contact and render the html
		$.ajax({  
			type: "POST",  
			url: "index.php",  
			data: datastring,  
			success: function(data)
			{
				$("#add_contact").html(data);
				//refresh the contact list
				$.ajax({  
					type: "POST",  
					url: "index.php",  
					data: 'action=list',  
					success: function(data) { $("#list_contact").html(data);}  
				});
			}  
		});
	}
	else
	{
		//display the errors
		ShowErrorMessages(error_messages);
	}

	return false;
}