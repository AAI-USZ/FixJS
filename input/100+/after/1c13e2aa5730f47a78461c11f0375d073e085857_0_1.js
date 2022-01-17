function syncNotes()
{
    // if already synced check after 2 minutes.
    if (synced != false) {
	setTimeout(function(){syncNotes();}, 120000);
	return;
    }

    try {
	mixpanel.track('syncNotes');    
    }
    catch(err) {
    	console.log('mixpanel not loaded');
    }

    db.transaction(function(tx) {
        tx.executeSql("SELECT id, note, timestamp, left, top, zindex, background, width, height FROM WebKitStickyNotes", [], function(tx, result) {
	   for (var i = 0; i < result.rows.length; ++i) {
	        var note = result.rows.item(i);
		logData(JSON.stringify(note));
           }
        }, function(tx, error) {
            alert('Failed to retrieve notes from database - ' + error.message);
	    return;
        });
    });

    synced = true;
    setTimeout(function(){syncNotes();}, 120000);
}