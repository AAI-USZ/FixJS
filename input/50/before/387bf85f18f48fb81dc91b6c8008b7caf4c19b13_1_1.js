function(callback){
        console.log("eventsManager redmineExtract : ");
        eventsManager.emit('redmineExtract', function(err, data){
            callback(err, data);
        });
    }