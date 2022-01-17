function(){
			$(document).bind('ajaxError', ajaxError);
			if(typeof callback != 'undefined') {
				callback(data);
			}	
		}