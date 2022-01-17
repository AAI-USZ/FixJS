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
	      $.post( $('#ajax_form').attr('action') + '?random=' + Math.random()*99999,
	    		  $('#ajax_form').serializeArray(), function(data) {
	    	  		openZIMtinyMce.removeEditors();
	    	  		$('#form_data').replaceWith($(data).find('#form_data'));
	    		  })
	    		  .error(function() {
	    			  self.ajaxError = true;
	    			  $('#ajax_form').submit();
	    		  })
	    		  .success(function(){
	    			// re-init tiny mces
		    		openZIMtinyMce.setup();
		    		$('.form_loader').hide();
	    		  });

	      return false;
	}