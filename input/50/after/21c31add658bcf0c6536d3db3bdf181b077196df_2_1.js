function(callback){
        console.log("taskDone!!");
        redmineExtract.workflow(function(err, data) {
            callback(err, data);
        });
    }