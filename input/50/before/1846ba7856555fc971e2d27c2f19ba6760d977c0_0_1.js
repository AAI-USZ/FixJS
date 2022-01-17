function()

	{

		var validator = jQuery("#queryForm").validate(

		{

			event : "blur",

			rules : 

			{

			

				"name" : { required : true},

				"sqlQuery" : {required : true}

				

			}

		});

	}