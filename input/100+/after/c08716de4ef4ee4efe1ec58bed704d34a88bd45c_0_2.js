function loadSwarmingCode(){
    redisClient.hgetall(mkUri("system","code"),
        function (err, hash){
            for (var i in hash){
                dprint("Loading swarming phase:" + i);
                try
                {
                    var obj = eval(hash[i]);
                    if(obj != null)
                    {
                        thisAdaptor.compiledSwarmingDescriptions[i] = obj;
                    }
                    else
                    {
                        console.log("Failed to load " + i);
                    }
                    //console.log(thisAdaptor.compiledWaves[i]);
                }
                catch(err)
                {
                    perror(err,"*** Syntax error in swarming description: " + i);
                }
            }
        });
}