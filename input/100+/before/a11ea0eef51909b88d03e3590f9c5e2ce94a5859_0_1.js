function(error, processEmu){
      if(error) return callback(error);

      return templating.render({ 'template':'library.js', 'view':{ node:true, include_process:!options.noprocess }, 'partials':{ 'path':path, 'process':processEmu } }, callback);  
    }