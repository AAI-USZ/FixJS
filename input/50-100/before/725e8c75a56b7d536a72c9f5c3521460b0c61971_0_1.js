function(){
      /*grab the plugin instance from element's data*/
      var instance = $(this).data('plugin_' + pluginName);
      if (!instance) {
        /*if no instance, create one (and store it in element's data)*/
        $(this).data('plugin_' + pluginName, new Plugin(this, options));
      } else if (instance[options]){
        /*call instance's method (if it exists)*/
        instance[options].apply(instance, [args]);
      } else {
        /*throw error if method doesn't exist*/
        $.error('Method ' +  options + ' does not exist on jQuery.' + pluginName);
      }
    }