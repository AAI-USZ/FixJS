function(){
            //and read domains again...
            fs.unwatchFile(file_path);
            self.writeDomains(name, file_path, options);
            self.core.purge('redis_cache');
          }