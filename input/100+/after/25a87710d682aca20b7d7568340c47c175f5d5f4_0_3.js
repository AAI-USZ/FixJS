function()
        {
	        
	        var w = container.width();
	        var h = container.height();
	        //keep the original (before launch plugin) sizes
	        original_size.w = w;
	        original_size.h = h;
	        
	        //if height_proportion is set on Auto
	        if (settings.height_proportion === true 
					|| settings.height_proportion == 'auto')
			{
				if (w && h)
					settings.height_proportion = Math.round(h / w * 100) / 100;
				else
				{
					(settings.debug) ? console.log('[bautosize]Cannot calculate height_proportion.') : false;
					settings.height_proportion = false;
				}
			}
	        
	        if (settings.trigger_at_load)
	        {
	            obj.resize(true);
	        }
	        
	        /* Enable the autoresize using jquery event at window resize */
	        $(window).resize(function()
	        {	
	        	$(container).bAutoSize('resize');
	        });
        }