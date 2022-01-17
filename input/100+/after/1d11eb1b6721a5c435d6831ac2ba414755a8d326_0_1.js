function(){
		    	TissueStack.Utils.sendAjaxRequest(
	    			"/backend/admin/upload_directory/json", "GET", true,
	    			function(result) {
			          $.each(result, function(i, field){
			          	var listOfFileName = "";
			          	for (i in field){
			  	        	//content = '<div style="text-align: left">'+'File Name: '+ field[i] + '</div><br/>';
			  	        	content = '<input type="checkbox" name='+'"radio_'+[i]+'" id="'+ 'radio_choice_'+ [i] + '" value="choice-'+[i]+'" />'+
			  	        			  '<label for="'+'radio_choice_'+ [i] +'">'+ field[i] + '</label>';
			  	        	listOfFileName += content; 
			             	 }
			               $('.file_radio_list').append(listOfFileName);
			          });
	    			}
		    	);
		    }