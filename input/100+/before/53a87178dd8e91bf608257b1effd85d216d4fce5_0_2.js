function(err, files) {
  
    if (err) { 
      
      throw err;
      
    }
    
    async.forEach(
        
        files
        
      , function iterator(filename, callback) {
          
          var file_path = path.join(dir_path, filename)
            , emitter
            ;
          if(cache[file_path]){
          	//already watching it
          	return;
          }
          fs.stat(file_path, function(err, stats) {
          
            if (err) {
              
              callback(err); 
              return; 
              
            }
            
            if (stats.isDirectory()) {
              
              emitter = watchTree_asyncFs({
              	path:file_path
              });
              
            } else {
              
              emitter = new FileHook({
              	name: 'file-hook',
              	path: file_path
              });
              
              cache[file_path] = emitter;       
            }
            
            emitter.on('change', function() {
              
              dir_event_emitter.emit('change');
              
            });
            
            emitter.on('destroy', function() {
              
              emitter.unwatch();
              
            });
            
            callback(null);
            
          });
          
        }
        
      , function callback(err) {
        
          if (err) { throw err; }
        
        }
        
    );
  
  }