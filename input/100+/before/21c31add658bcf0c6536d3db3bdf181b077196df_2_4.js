f    //redmineExtract.storeAll(IssueExtract, 'issues', callback);
    console.log("===> redmineExtract.js : storeAllNotes");

    IssueExtract.find({}, function (err, docs) {
        //console.log("err : ", err);
        //console.log("docs : ", docs);
        //eventsManager.emit('getUsers::response', docs);
        var iLoopCount = docs.length;
        for (var i = 0; i < iLoopCount; i++) {
            var issue = docs[i];
            //console.log("issue : ", issue);

            //console.log("issue.id : ", issue.id);
            //redmineRest.getIssueParams(issue.id, {include: 'journals'}, function(err, data) {
            redmineRest.getIssueParamsAddData(issue.id, {include: 'journals'}, function(err, data, currentIssue) {

                console.log("currentIssue.id : ", currentIssue.id);
                //console.log("data : ", data);
                //currentIssue.journals = data.currentIssue.journals;
                //currentIssue.save();
                //var journals = [];
                var jLoopCount = data.issue.journals.length;
                for (var j = 0; j < jLoopCount; j++) {
                    //data.issue.journals[i].notes = textile(data.issue.journals[i].notes);
                    var journalData = data.issue.journals[j];
                    //console.log("journalData : ", journalData);
                    var journal = new Journal(journalData);

                    //var kLoopCount = journalData.length;
                    //for (var k = 0; k < kLoopCount; k++) {
                        //var detailData = journalData[k];
                        //var detail = new Detail(detailData);
                        //journal.details.push(detail);
                    //}
                    //delete loopCount;

                    console.log("journal.id : ", journal.id);
                    journal.save();
                    currentIssue.journals.push(journal);
                    currentIssue.save();

                }
                delete loopCount;
                 //callback(err, journals);
                callback(err, data);
            }, issue);
        }
        delete loopCount;
        eventsManager.emit('redmineExtract::storeAllNotesDone');
        eventsManager.emit('redmineExtract::taskDone', callback);
    });
};
