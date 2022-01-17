function(){
    //execute transaction
    if(domains > 0){
      transaction.exec(function(err){
        if(err) self.core.log.error({error:err, source:'Redis writeDomains'});
        if(callback) callback();

        //If we need to watch a file
        if(options.watch){
          fs.watchFile(file_path, function (curr, prev) {
            //wait for changes and then delete the current category list
            self.client.del(self.prefix + ':category:' + name, function(){
              //and read domains again...
              fs.unwatchFile(file_path);
              self.writeDomains(name, file_path, options);
              self.core.purge('redis_cache');
            });
          });
        }      
      });
    }    
  }