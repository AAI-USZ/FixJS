function(CNEditor, start, startOffset, end, endOffset) {
        var myRange, sel;
        sel = rangy.getIframeSelection(CNEditor.editorIframe);
        myRange = rangy.createRange();
        myRange.startContainer = CNEditor.editorBody$.children("#CNID_" + start)[0];
        myRange.startOffset = startOffset;
        myRange.endContainer = CNEditor.editorBody$.children("#CNID_" + end)[0];
        myRange.endOffset = endOffset;
        console.log(myRange);
        sel.removeAllRanges();
        console.log(sel);
        sel.setSingleRange(myRange);
        return console.log(sel);
      }