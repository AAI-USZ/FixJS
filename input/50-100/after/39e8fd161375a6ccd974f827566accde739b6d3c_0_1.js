function(error_frame) {
    var msg = "stomp_client error => ";
    if (error_frame) {
        if (error_frame.body) {
            msg = msg + error_frame.body;
        } else {
            msg = msg + error_frame.toString();
        }
    } else {
        msg = msg + " Unknown Error";
    }
    log(msg, {facility: whatami, level: LOG_ERROR});
}