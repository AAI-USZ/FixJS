function() {
	     var self = this;
      	     $('.form_loader').show();
      
	      // do not do ajax call if there are any
	      // non-empty file inputs
	      if ( self.ajaxError || $.browser.msie || 
		   $("input:file[value|='']").length > 0 )
		return true;

	      self.ajaxError = false;

	      tinyMCE.triggerSave(); 
	      $('#form_data').load(
	        $('#ajax_form').attr('action') + '?random=' + Math.random()*99999 + ' #form_data',
	        $('#ajax_form').serializeArray(),
	         function(response, status, xhr) {
			if (status == "error") {
				self.ajaxError = true;
	  			$('#ajax_form').submit();
			}else
				$('.form_loader').hide(); 
		 }
	      );
	      return false;
	}