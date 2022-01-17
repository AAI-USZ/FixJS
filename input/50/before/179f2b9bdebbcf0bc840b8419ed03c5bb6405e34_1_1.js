function(callback){
        console.log("eventsManager redmineExtract::getProjects : ");
        eventsManager.emit('redmineExtract::getProjects', function(err, data){
            callback(err, data);
        });
    }