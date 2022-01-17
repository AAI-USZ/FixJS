function(key,val){
        //TODO : add LRU and timout logic
       var msg = 'inside _set key = '+key+' val = '+val;
       logger.log(msg);
       entries[key]=val;
       count++;
    }