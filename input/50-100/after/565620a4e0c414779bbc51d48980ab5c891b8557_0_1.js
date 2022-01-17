function(data){
	    		data = $(data)
	    		if(data.find('.errorlist').length){
		    		$('#profile_form').replaceWith(data)
		    		createUploader();
		    		$( ".datepicker" ).datepicker({'font-size':'10px', 'dateFormat': 'yy-mm-dd'});
	    		}else{
	    			document.location.href = $('#profile_form').attr('success_url')
	    		}
	    	}