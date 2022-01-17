function(data) {  

				   

			//create array for response objects  

			var suggestions = [];  

				   

			jQuery.each(data, function(i, val){  

			suggestions.push(val);  

		   });

		   

		   	//this clears the error if it returns no result

		    //if the input field is not empty

		    //the error will be triggered in onblur below

			if (suggestions.length==0) hiddenField.val("");



			

			add(suggestions);  

		 }