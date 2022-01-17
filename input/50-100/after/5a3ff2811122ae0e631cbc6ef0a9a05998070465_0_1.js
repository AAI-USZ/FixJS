function(error, librarySC){
    if(error){
      return callback(error);
    }
    templating.render({ 
      'template':'wrapper.js', 
      'view':{ 'name':options.treeName, 'debug':options.debug }, 
      'partials':{ 
        'node':'',
        'library':librarySC, 
        'packages':options.renderedPkgs.join('\n\n\n\n') 
      } 
    }, callback); 
  }