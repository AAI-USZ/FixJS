function() {
    eventsManager.on('redmineExtract::sync', function(data){
        redmineExtract.sync( function(err, data) {
        });
    });

    eventsManager.on('redmineExtract::getIssues', function(callback){
        redmineExtract.getIssues(function(err, data) {
            callback(err, data);
        });
    });

    eventsManager.on('redmineExtract::getProjects', function(callback){
        redmineExtract.getProjects(function(err, data) {
            callback(err, data);
        });
    });

    eventsManager.on('redmineExtract::taskDone', function(callback){
        redmineExtract.workflow(function(err, data) {
            callback(err, data);
        });
    });

    eventsManager.on('redmineExtract::storeAllIssuesDone', function(callback){
        issuesStored = true;
    });

    eventsManager.on('redmineExtract::storeAllNotesDone', function(callback){
        notesStored = true;
    });
}