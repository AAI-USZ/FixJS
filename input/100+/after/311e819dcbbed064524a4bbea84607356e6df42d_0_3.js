function(i, field){
	        	var listOfFileName = "";
	        	for (i in field){
		        	content = '<input type="checkbox" name='+'"check_'+[i]+'" id="'+ 'check_'+ [i] + '" value="check_'+[i]+'" />'+
		        			  '<label for="'+'check_'+ [i] +'">'+ field[i] + '</label>';
		        	listOfFileName += content; 
	           	 }
              $('.file_radio_list').fadeIn(1500, function() {  
              	 $('.file_radio_list').append(listOfFileName)
              	 	.trigger( "create" ); 
              	 $('.file_radio_list').controlgroup();
              });
	        }