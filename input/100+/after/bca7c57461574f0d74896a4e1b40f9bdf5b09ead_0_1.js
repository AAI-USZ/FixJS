function(err, data) {
            
            var config
              , src
              ;
            
            if (err) { 
              
              if (err.code !== 'ENOENT') {
              
                callback(err);
              
              } else {
              
                callback(null); 
              
              }
              
            } else {
              
              config = JSON.parse(data);
              
              if (config.paths) {
                
                for (var name in config.paths) {
                  
                  src = config.paths[name];
                  
                  if (Array.isArray(src) || src.substr(0,4) === 'http') {
                    
                    external_modules.push(name);
                    config.paths[name] = 'empty:';
                    
                  }
                  
                }
                
                options.paths = config.paths;
                
              }
              
              config.optimize && (options.optimize = config.optimize);
              
              options.paths = options.paths || {};
              
              options.paths['jade-runtime'] = 'empty:';
              
              external_modules.push('now');
              options.paths['now']          = 'empty:';
              
              callback(null);
              
            }
            
          }