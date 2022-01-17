function () {
        if (!fr.contentDocument || !fr.contentDocument.body) { return; }
        var bd = fr.contentDocument.body;
        bd.style.cssText = ([
          "margin:0",
          "padding:0",
          "position:absolute",
          "height:100%",
          "width:100%",
          "-webkit-column-width:"+testFrameSize+"px",
          "-webkit-column-gap:0",
          "-moz-column-width:"+testFrameSize+"px",
          "-moz-column-gap:0",
          "-o-column-width:"+testFrameSize+"px",
          "-o-column-gap:0",
          "column-width:"+testFrameSize+"px",
          "column-gap:0"
        ].join(";"));
        if (bd.scrollHeight > testFrameSize) {
          bd.style.cssText += ["min-width:200%", "overflow:hidden"].join(";");
          if (bd.scrollHeight <= testFrameSize) {
            bd.className = "column-force";
          } else {
            bd.className = "column-failed "+bd.scrollHeight;
          }
        }
        frameLoadCallback(fr);
      }