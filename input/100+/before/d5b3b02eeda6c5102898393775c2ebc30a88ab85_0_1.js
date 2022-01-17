function processProgress(progress) {
    if ( progress['error'] ) {
        clearInterval(ajaxEventHandle);
        appendDebug("There was an error in running the prediction: " 
                + progress['error']);
    } else {
        // get the progress of the wind data
        if ( progress['gfs_complete'] == true ) {
            if ( progress['pred_complete'] == true ) { // pred has finished
                $("#prediction_status").html("Prediction finished.");
                appendDebug("Server says: the predictor finished running.");
                appendDebug("Attempting to retrieve flight path from server");
                // reset the GUI
                resetGUI();
                // stop polling for JSON
                clearInterval(ajaxEventHandle);
                // parse the data
                getCSV(current_uuid);
                appendDebug("Server gave a prediction run timestamp of " 
                        + progress['run_time']);
                appendDebug("Server said it used the " 
                        + progress['gfs_timestamp'] + " GFS model");
                writePredictionInfo(current_uuid, progress['run_time'], 
                        progress['gfs_timestamp']);
                addHashLink("uuid="+current_uuid);
            } else if ( progress['pred_running'] != true ) {
                $("#prediction_status").html("Waiting for predictor to run...");
                appendDebug("Server says: predictor not yet running...");
            } else if ( progress['pred_running'] == true ) {
                $("#prediction_status").html("Predictor running...");
                appendDebug("Server says: predictor currently running");
            }
        } else {
            $("#prediction_status").html("Downloading wind data");
            $("#prediction_progress").progressbar("option", "value",
                progress['gfs_percent']);
            $("#prediction_percent").html(progress['gfs_percent'] + 
                "% - Estimated time remaining: " 
                + progress['gfs_timeremaining']);
            appendDebug("Server says: downloaded " +
                progress['gfs_percent'] + "% of GFS files");
        }
    }
    return true;
}