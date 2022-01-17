function previewCalls(dec) {
    var prev = '';
    for (var i = 0; i < dec.calls.length; i++) {
        if (dec.calls[i].output != "wmtrace_not_exported")
            prev += '<li>'+dec.calls[i].module+':'+dec.calls[i]['function']+'</li>';
    }
    return prev;
}