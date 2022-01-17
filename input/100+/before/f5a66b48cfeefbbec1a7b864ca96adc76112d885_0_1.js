f        var journals = data.journals;
        //var iLoopCount = journals.length -1;
        //for (var i = iLoopCount; i >= 0; i--) {
        var iLoopCount = journals.length;
        for (var i = 0; i < iLoopCount; i++) {
            var journal = journals[i];
            var details = journal.details;
            var jLoopCount = details.length;
            for (var j = 0; j < jLoopCount; j++) {
                var detail = details[j];
                //console.log("detail.name : ", detail.name);
                if (detail.name === 'status_id' && detail.new_value == statuses[type]) {
                    //console.log("journal.created_on : ", journal.created_on);
                    //console.log("journal : ", journal);
                    return journal.created_on;
                }
            }
            delete loopCount;
        }
        return '';
        delete loopCount;
    };
