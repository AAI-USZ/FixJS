function(error, path){
    if(error) return callback(error);

    var view = { 
      'debug': options.debug,
      'version':'1.3.5', 
      'versions':JSON.stringify({ 'one':'1.3.4' }),
      'env': JSON.stringify(process.env)
    };

    templating.render({ 'template':'process.js', view:view }, function(error, processEmu){
      if(error) return callback(error);

      return templating.render({ 'template':'library.js', 'view':{ node:true, include_process:!options.noprocess }, 'partials':{ 'path':path, 'process':processEmu } }, callback);  
    });    
  }