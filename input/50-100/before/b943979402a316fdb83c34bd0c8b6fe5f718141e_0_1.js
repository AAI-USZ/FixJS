function(lasttime){
        var now = (new Date()).getTime();
        for(var timestamp in store){
            if(timestamp > lasttime){
                //return next store entry
                return store[timestamp];
            }else if(timestamp < now-2000){
                //delete old store entries
                delete store[timestamp];
            }
        }
        return null;
    }