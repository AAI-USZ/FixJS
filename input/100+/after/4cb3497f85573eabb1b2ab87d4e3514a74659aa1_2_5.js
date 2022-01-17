function(name, file_path, options, callback){

  var self = this;
  var domains = 0;
  
  options = options || {};
  
  if(!callback && typeof options == 'function'){
    callback = options;
    options = {};
  }
  
  if(this.connection_problem){
    if(callback) callback();
    this.core.log.error({error:'No write possible', source:'Redis writeDomains'});
    return;
  }
  
  
  //start a redis "transation"
  var transaction = this.client.multi();
  
  
  //read the domains file line by line
  var reader = new BufferedReader(file_path, { encoding: "utf8" });
  
  reader.on('line', function(domain){
    //convert bytes to string
    domain = domain.toString();

    //add to the redis set
    domains++;
    transaction.sadd(self.prefix + ':category:' + name, domain);        
  });
  
  reader.on('error', function(err){
    callback(err);
  });
  
  //file reading done
  reader.on('end', function(){
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
  });

  reader.read();

}