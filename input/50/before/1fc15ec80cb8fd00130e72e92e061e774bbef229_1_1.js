function(){
            //and read domains again...
            fs.unwatchFile(file_path);
            self.writeDomains(name, file_path, options);
            this.cache.purge('redis_cache');
          }