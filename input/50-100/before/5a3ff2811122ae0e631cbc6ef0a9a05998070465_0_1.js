function(error, librarySC){
    if(error){
      return callback(error);
    }
    templating.render({ 
      'template':'wrapper.js', 
      'view':{ 'name':options.treeName }, 
      'partials':{ 
        'node':'',
        'library':librarySC, 
        'packages':options.renderedPkgs.join('\n\n\n\n') 
      } 
    }, callback); 
  }