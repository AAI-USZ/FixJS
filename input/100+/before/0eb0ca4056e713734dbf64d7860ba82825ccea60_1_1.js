function () {
    	if ( $(this).attr('data-fetch-url')!='') {
	        var jqXHR = $.ajax({
	            url: $(this).attr('data-fetch-url'),
	            context: $(this),
	            doNotRetry: true
	        });
	
	        if (jqXHR) {
	            jqXHR.done(function (data) {
	            	$(this).append(data);
	                var url = $(".url").attr('data-fetch-url');
	                $(".url").remove();
	                this.attr('data-fetch-url', url); 
	
	            });
	
	            jqXHR.fail("");
	        }
    	}
    }