function(err, data, currentIssue) {

                console.log("currentIssue.id : ", currentIssue.id);
                currentIssue.time_entriesTotal = 0;
                //console.log("data : ", data);
                var jLoopCount = data.time_entries.length;
                for (var j = 0; j < jLoopCount; j++) {
                    var timeEntryData = data.time_entries[j];
                    var timeEntry = new TimeEntry(timeEntryData);

                    console.log("timeEntry.id : ", timeEntry.id);
                    //console.log("timeEntry.hours : ", timeEntry.hours);
                    //console.log("timeEntry.hours + 1 : ", timeEntry.hours + 1);
                    //console.log("currentIssue.time_entriesTotal : ", currentIssue.time_entriesTotal);
                    timeEntry.save();
                    currentIssue.time_entries.push(timeEntry);
                    if (timeEntry.hours) {
                        currentIssue.time_entriesTotal += timeEntry.hours;
                    }
                    currentIssue.save();

                }
                delete jLoopCount;
                if (currentIssue == issue) {
                    eventsManager.emit('redmineExtract::storeAllTimeEntriesDone');
                    eventsManager.emit('redmineExtract::taskDone', callback);
                }
                callback(err, data);
            }