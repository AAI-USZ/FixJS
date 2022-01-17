function(e){

		e.preventDefault();

		$(this).validate();

		myJSON.formName = $(this).attr('name');
		
		myJSON.keys = new Object();
		
		myJSON.keys = getSQLParams(myJSON.keys);

		myJSON.datas = $(this).toJSON();
		
		$.post('php/foRml.php',myJSON,function(data){alert(data);});

	}