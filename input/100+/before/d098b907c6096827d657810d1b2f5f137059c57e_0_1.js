function(event, position, total, percentComplete) {
		    	var check_Success = 1;
		    	$.each($('.uploaded_file'), function(i, uploaded_file) {
		    		var filePath = $('#filename_1').val();
		    		if(filePath.match(/fakepath/)){
		    			filePath = filePath.replace(/C:\\fakepath\\/i, '');	    		
		    		}
		    		if (_this.session == null || filePath == uploaded_file.value || filePath == '') {
		    			check_Success = null;
		    		}	
		    	});
		    	if(check_Success !=null){
			    	var percentVal = percentComplete + '%';
			    	bar.width(percentVal)
			    	percent.html(percentVal);
		    	}
		    }