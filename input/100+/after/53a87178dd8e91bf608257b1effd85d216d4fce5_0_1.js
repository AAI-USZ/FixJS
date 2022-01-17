function(err, stats) {
          
            if (err) {
              
              callback(err); 
              return; 
              
            }
            
            if (stats.isDirectory()) {
              
              emitter = watchTree_asyncFs({
              	name: 'file-hook',
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
            
          }