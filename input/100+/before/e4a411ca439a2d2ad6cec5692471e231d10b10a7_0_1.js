function(i, field){
				  	for (i in field){
	 					if ($('#check_'+[i]).is(':checked')) {
	 					console.info(field[i]);
				    }
			    };
			  }