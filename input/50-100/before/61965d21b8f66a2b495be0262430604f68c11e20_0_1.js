function setStatus(num, str) {
    // Handle status changes
    //**********************
    // Status codes:
    // StartUpload = 0;
    // UploadDone = 1;
    // StartRecord = 2;
    // StartPlay = 3;
    // PauseSet = 4;
    // Stopped = 5;
    YUI().use('node', function(Y) {
        var object = Y.one('object'),
        doc = object.get('contentDocument');
        
        var status = Y.Node.getDOMNode(doc.one('#Status'));
        status.value = str;
    });
}