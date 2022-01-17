function(callback){
        redmineExtract.getIssues(function(err, data) {
            callback(err, data);
        });
    }