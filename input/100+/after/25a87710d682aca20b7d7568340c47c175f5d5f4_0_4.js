function(force)
        {
        	//if the plugin is locked nothing to do.
        	if (this.locked)
      		{
      			return false;
      		}
        	
	        ww = Math.floor(settings.parent.width());
	        hh = Math.floor(settings.parent.height());
	        
	        if (settings.debug)
	        {
	        	console.log('[bautosize] for #' + container.attr('id'));
	            console.log('[bautosize]parent.w : ' + ww  + ' parent.h : ' + hh);
	        }
	        
	        //redraw only if a minimum difference is reached
	        if(!force &&
	            Math.abs(ww - parent_last_size.w) < settings.trigger_minimum 
	        	&& Math.abs(hh - parent_last_size.h) < settings.trigger_minimum
	           )
	        {
	            //no need to resize
	            return false;
	        }
	        
	        parent_last_size.w = ww;
	        parent_last_size.h = hh;
	        
	        //get the available spaces minus offsets
	        new_width = Math.floor((ww - settings.width_offset) * settings.width_perc);
	        new_height = Math.floor((hh - settings.height_offset ) * settings.height_perc);
	        
	        
	        /*
	        enforce - height proportion
	        if you want this enforcement to be more important
	        move it after minimum and maximum ifs */
	        if (settings.height_proportion > 0)
	        {
	            settings.debug ? (console.log('enforced proportion h' + settings.height_proportion)) : true;
	            old_height = new_height;
	            new_height = Math.floor(new_width * settings.height_proportion);
	            
	            //when the height is too big, smart AUTOFIT to window
	            if (new_height > old_height)
	            {
	                //we need to shrink the width in order to autofit
	                new_width = Math.floor(new_width * (old_height / new_height));
	                new_height = Math.floor(new_width * settings.height_proportion);
	            }
	            
	        }
	        //enforce - minimum size
	        if (settings.minimum)
	        {
	            if (typeof settings.minimum.w !== 'undefined'
	                && new_width < settings.minimum.w)
	            {
	                settings.debug ? (console.log('[bautosize]enforced minimum w' + settings.minimum.w)) : true;
	                new_width = Math.max(new_width,settings.minimum.w);
	            }
	            if (typeof settings.minimum.h !== 'undefined'
	                && new_height < settings.minimum.h)
	            {
	                settings.debug ? (console.log('[bautosize]enforced minimum h' + settings.minimum.h)) : true;
	                new_height = Math.max(new_height,settings.minimum.h);
	            }
	        }
	        //enforce - maximum size
	        if (settings.maximum)
	        {
	            if (typeof settings.maximum.w !== 'undefined'
	                && new_width > settings.maximum.w)
	            {
	                settings.debug ? (console.log('[bautosize]enforced maximum w' + settings.maximum.w)) : true;
	                new_width = Math.min(new_width,settings.maximum.w);
	            }
	            if (typeof settings.maximum.h !== 'undefined'
	                && new_height > settings.maximum.h)
	            {
	                settings.debug ? (console.log('[bautosize]enforced maximum h' + settings.maximum.h)) : true;
	                new_height = Math.min(new_height,settings.maximum.h);
	            }
	        }
	        
	        
	        //make it happen - jquery power
	        container.width(new_width);
	        container.height(new_height);			
	        
	        if (settings.resize_children)
	        {
	            //setup the dom elements attributes 
	           $(container).children().each(function(i,e){                    
	                $(e)[0].width = new_width;
	                $(e)[0].height = new_height;
	            });//end each()
	        }
	        
	        //external canvas
	        if (typeof(settings.callback) == 'function')
	           settings.callback.call((settings.callback_env) ? settings.callback_env : false);
	        
	        if (settings.debug)
	            console.log('[bautosize] elem.w : ' + new_width  + ' elem.h : ' + new_height);
	        
	        return true;
        }