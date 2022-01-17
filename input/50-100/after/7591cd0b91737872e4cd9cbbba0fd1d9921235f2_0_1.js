function(ctrlSeq, html, text) {
    if (!text) text = ctrlSeq && ctrlSeq.length > 1 ? ctrlSeq.slice(1) : ctrlSeq;

    // add #mqCmdId attribute macro to all open tags
    html = html.replace(/<([^\/>][^>]*)>/g, '<$1 #mqCmdId>');

    _super.init.call(this, ctrlSeq, html, [ text ]);
  }