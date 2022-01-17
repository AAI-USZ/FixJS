function( callback ) {
    console.log("===> redmineExtract.js : storeAllNotes");

    Journal.collection.drop();

    IssueExtract.find({}, function (err, docs) {
        var iLoopCount = docs.length;
        //iLoopCount = 1;
        for (var i = 0; i < iLoopCount; i++) {
            var issue = docs[i];
            redmineRest.getIssueParamsAddData(issue.id, {include: 'journals'}, function(err, data, currentIssue) {

                console.log("currentIssue.id : ", currentIssue.id);
                var jLoopCount = data.issue.journals.length;
                for (var j = 0; j < jLoopCount; j++) {
                    var journalData = data.issue.journals[j];
                    var journal = new Journal(journalData);

                    console.log("journal.id : ", journal.id);
                    journal.save();
                    currentIssue.journals.push(journal);
                    currentIssue.save();

                }
                delete jLoopCount;
                if (currentIssue == issue) {
                    eventsManager.emit('redmineExtract::storeAllNotesDone');
                    eventsManager.emit('redmineExtract::taskDone', callback);
                }
                callback(err, data);
            }, issue);
        }
        delete iLoopCount;
    });
}