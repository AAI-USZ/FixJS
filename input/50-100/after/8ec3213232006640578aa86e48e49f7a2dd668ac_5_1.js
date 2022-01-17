function() {

	

//signup form page clearing box onclick

	$('#input_fullname').click(function(){

		fullname_check()

		});

		

	if($('#input_fullname').val()=='e.g. John Smith'){

		$('#input_fullname').css('color','#555');

	}

	

	

}