function( callback ) {
    console.log("===> redmine.js : workflow");

    if (!issuesStored) {
        redmineExtract.storeAllIssues( callback );
    }
    else if (!notesStored) {
        redmineExtract.storeAllNotes( callback );
    }
    else if (!timeEntriesStored) {
        redmineExtract.storeAllTimeEntries( callback );
    }
    else {
        console.log("——————workflow done——————");
    }
}