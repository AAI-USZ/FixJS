function sendMultipleFiles(handler){
    var length = handler.files.length,
        i = 0,
        onload = handler.onload;
    handler.current = 0;
    handler.total = 0;
    handler.sent = 0;
    while(handler.current < length)
        handler.total += handler.files[handler.current++].fileSize;
    handler.current = 0;
    if(length){
        handler.file = handler.files[handler.current];
        //console.log(handler.file);
        sendFile(handler).onload = function(rpe, xhr){
            if(++handler.current < length){
                handler.sent += handler.files[handler.current - 1].fileSize;
                handler.file = handler.files[handler.current];
                sendFile(handler).onload = arguments.callee;
            } else if(onload) {
                handler.onload = onload;
                handler.onload(rpe, xhr);
            }
        };
    };
    return  handler;
}