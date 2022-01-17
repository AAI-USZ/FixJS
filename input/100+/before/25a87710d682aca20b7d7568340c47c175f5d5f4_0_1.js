function()
        {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           bAutoSize = element.data('bAutoSize');
           if (bAutoSize)
           {
                if (typeof(bAutoSize[call]) == 'function')
                    bAutoSize[call].call();
                
                return element.data('bAutoSize');
           }
        
           // pass options to plugin constructor
           var bAutoSize = new AutoResize(this, options);
        
           // Store plugin object in this element's data
           element.data('bAutoSize', bAutoSize);
        }