function(filename){
        var config = this.config;
        for(var i in config.exclude){
            if(config.exclude[i].test(filename)){
                return true;
            }
        }
        return false;
    }