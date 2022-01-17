function(element, options)
   {
        var container = $(element);
        var obj = this;
        var parent_last_size = {w:null,h:null};//last redraw window sizes
        
        var original_size = {w:null,h:null};//original size, used in rollback method
        this.locked = false;//internal lock of the resize
        
        var settings = $.extend({
        parent : $(container).parent(),//parent on which the calculations are made
        trigger_at_load : true,//trigger it at page load
        trigger_minimum : 20,//min px for difference at resize to trigger the resize
        width_offset : 0,//PX to take from the container space
        height_offset : 0,
        width_perc : 1,//percent of available space that the container will occupy
        height_perc : 1,//examples : 0.1 for 10%, 1 for 100%
        minimum : false,// false or object with minimum a sizes in PX
                                    //examples : "false", "{w : 300, h : 200}", "{h : 600}"
        maximum : false, //{w : 800, h : 600},
        height_proportion : false, //boolean or > 0.1 value to keep the height proportional of width 
                                //examples : "0.5", "1", "2".True ('auto') or false to disable it.
        callback : null,//after each resize the callback will be called if any
        callback_env : null, //the "this" env in which the function will be called. Default :window
        resize_children : false,//input the same size onto ALL children too
        debug : false,
        }, options || {});
        
        this.init = function()
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
        }//end init()
        
        /* The main function */
        this.resize = function(force)
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
        }//end resize()
        
        
        /* Used to permanently or temporarily disable the auto resize. */
        this.lock = function()
        {
        	this.locked = true;
        	(settings.debug) ? console.log('[bautosize]Plugin is now locked.') : false;
        	return true;
        }
        this.unlock = function()
        {
        	this.locked = false;
        	(settings.debug) ? console.log('[bautosize]Plugin is now UNlocked.') : false;
        	return true;
        }
       
        /* It will resize the element back to its original position. Best used after lock(); */
        this.rollback = function()
        {
        	if (!original_size.w || !original_size.h || this.locked)
        		return false;
        	$(container)
				.width(original_size.w)
				.height(original_size.h);
			(settings.debug) ? console.log('[bautosize]Rolled back to original size.') : false;
			return true;
        }
        
        /** When the dom is ready, we need to init the autoresize   */
        $(document).ready(this.init);//end ready()
       }