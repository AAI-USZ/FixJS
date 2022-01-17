function(callback) {
    console.log("redmineExtract getIssues : ");
    var query = IssueExtract.find({});
    query.sort('project.name', 1);
    query.sort('created_on', 1);
    //query.limit(10);
    query.exec( function (err, docs) {

/*
 *        var data = [];
 *
 *        var loopCount = docs.length;
 *        for (var i = 0; i < loopCount; i++) {
 *            var doc = docs[i];
 *            var firstJournal = doc.journals[doc.journals.length -1];
 *            var firstJournalCreatedOn = firstJournal.created_on;
 *            var firstJournalUserName = firstJournal.user.name;
 *            //eventsManager.emit('log', firstJournal.created_on);
 *            data.push({
 *                id: doc.id,
 *                name: doc.subject,
 *                project: doc.project.name,
 *                created_on: doc.created_on,
 *                author: doc.author.name,
 *                first_journal_on: firstJournalCreatedOn,
 *                first_journal_author: firstJournalUserName
 *            });
 *        }
 *        delete loopCount;
 *
 *        callback(err, data);
 */
        //callback(err, [docs[0], docs[1]]);
        //eventsManager.emit('log', docs[0], docs[1]);
        /*
         *if (docs) {
         *    var docsTest = [];
         *    for (var i = 0; i < 25; i++) {
         *        docsTest.push(docs[i]);
         *        console.log("i : ", i);
         *    }
         *    callback(err, docsTest);
         *}
         */
        eventsManager.emit('log', docs);
        callback(err, docs);
    });

}