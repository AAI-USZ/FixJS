function( callback ) {
    console.log("===> redmine.js : workflow");

    if (!issuesStored) {
        redmineExtract.storeAllIssues( callback );
    }
    else if (!notesStored) {
        redmineExtract.storeAllNotes( callback );
    }
}