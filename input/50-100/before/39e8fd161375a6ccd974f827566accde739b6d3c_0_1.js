function(error_frame) {
    var msg = "ERROR: " + (error_frame.body) ? error_frame.body : error_frame.toString;
    log(msg, {facility: whatami, level: LOG_ERROR});
}