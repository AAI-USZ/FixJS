function(callback) {
    console.log("redmineExtract getIssues : ");
    var query = IssueExtract.find({});
    query.sort('project.name', 1);
    query.sort('created_on', 1);
    query.limit(10);
    /*
     *query.exec( function (err, docs) {
     *    eventsManager.emit('log', docs);
     *    callback(err, docs);
     *});
     */

    var stream = query.stream();

    stream.on('data', function (doc) {
        console.log("doc watta watta : ", doc.id);
        eventsManager.emit('redmineExtract::getIssues::response', doc);
    });

    stream.on('error', function (err) {
        // handle err
    });

    stream.on('close', function () {
        // all done
        console.log("stream done !");
        callback();
    });
}