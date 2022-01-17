function()
        {            
	        //add to ignored height the header as example
	        settings.ignored_height += $('#header').outerHeight();
	        
	        if (settings.trigger_at_load)
	        {
	            obj.resize(true);
	        }
	        
	        /* Enable the autoresize using jquery event at window resize */
	        $(window).resize(function()
	        {	
	        	$(container).bAutoSize(false,'resize');
	        });
        }