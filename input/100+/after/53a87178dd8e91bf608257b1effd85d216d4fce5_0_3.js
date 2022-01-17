function watchTree_asyncFs(options) {
  var dir_path = options.path;

  var dir_event_emitter = new FileHook(options)
    ;
  
  fs.readdir(dir_path, function(err, files) {
  
    if (err) { 
      //TODO: need to deal with errors
      switch(err.code){
      	case 'EACCES':
      		dir_event_emitter.emit('async-fs::file::watch_error', {path: err.path, message: 'Error Accessing File.  Watch Aborted'});
      		return;
      		break;
      }
      throw err;
      
    }
    
    dir_event_emitter.fileListCache = files;
    
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
            
          });
          
        }
        
      , function callback(err) {
        
          if (err) { throw err; }
        
        }
        
    );
  
  })
  
  return dir_event_emitter;
}