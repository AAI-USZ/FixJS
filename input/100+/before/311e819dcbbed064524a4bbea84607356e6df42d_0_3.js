function(i, field){
	        	var listOfFileName = "";
	        	for (i in field){
		        	content = '<input type="checkbox" name='+'"radio_'+[i]+'" id="'+ 'radio_choice_'+ [i] + '" value="choice-'+[i]+'" />'+
		        			  '<label for="'+'radio_choice_'+ [i] +'">'+ field[i] + '</label>';
		        	listOfFileName += content; 
	           	 }
              $('.file_radio_list').fadeIn(1500, function() {  
              	 $('.file_radio_list').append(listOfFileName)
              	    .trigger( "create" ); 
              	 $('.file_radio_list').controlgroup();
              });
	        }