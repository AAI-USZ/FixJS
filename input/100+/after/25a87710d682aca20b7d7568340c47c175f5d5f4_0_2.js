function(options,args)
   {
        return this.each(function()
        {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           bAutoSize = element.data('bAutoSize');
           if (bAutoSize)
           {
           		//if "options" is actually a function to call
                if (typeof(bAutoSize[options]) == 'function')
                {
                	if (args && args.length > 0)
                    	bAutoSize[options].apply(bAutoSize,args);
                	else
                    	bAutoSize[options].call(bAutoSize);
                }
                
                return element.data('bAutoSize');
           }
        
           // pass options to plugin constructor
           var bAutoSize = new AutoResize(this, options);
        
           // Store plugin object in this element's data
           element.data('bAutoSize', bAutoSize);
        });
   }