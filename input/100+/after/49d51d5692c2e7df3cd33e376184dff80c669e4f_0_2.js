function previewCalls(dec) {
    var prev = '';
    for (var i = 0; i < dec.calls.length; i++) {
      if(dec.calls[i].call.indexOf("(default)") !== 0) {
        prev += '<li>'+dec.calls[i].call;
        if(dec.calls[i].source !== null)
          prev += " (" + dec.calls[i].source + ")";
        prev+='</li>';
      }
    }
    return prev;
}