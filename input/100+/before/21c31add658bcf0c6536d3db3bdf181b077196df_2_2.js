function(callback) {
    console.log("redmineExtract getIssues : ");
    var query = IssueExtract.find({});
    //query.where('project.name').in(['ANCA - Aéroport de nice - V1']);
    query.where('project.name').in(server.config.extract.subprojects);
    query.exec(callback);
    /*
     *Issue.find({'project.name': 'ANCA*'}, function (err, docs) {
     *    //console.log("err : ", err);
     *    //console.log("docs : ", docs);
     *    //eventsManager.emit('getUsers::response', docs);
     *    callback(err, docs);
     *});
     */
}