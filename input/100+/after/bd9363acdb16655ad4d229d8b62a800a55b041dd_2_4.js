function(editor, nodeType){
      var range = selection.getRangeAt(0),
      start = startNode(),
      end = endNode();

      editor.collapsed = range.collapsed;

      // Fix firefox bug: a focused element that is contentEditable
      // does not place the cursor inside an inner tag, but just
      // selects the whole node
      if(start.is('.preview')){
        start = $(start[0].firstChild);
      }
      if(end.is('.preview')){
        if(editor.collapsed){
          end = start;
        } else {
          end = $(end[0].lastChild);
        }
      }
      
      editor.leftBorder = new Border(start, nodeType, 'previousSibling');
      editor.rightBorder = new Border(end, nodeType, 'nextSibling');

      range.setStartBefore(editor.leftBorder.node);
      range.setEndAfter(editor.rightBorder.node);

      // split node if there are other nodes after the selection
      if(editor.rightBorder.borderNode){
        $(editor.rightBorder.borderNode).nextAll()
          .appendTo('<' + editor.rightBorder.block.nodeName + '>').parent()
          .insertAfter(editor.rightBorder.block);
      }

     return range.extractContents();
    }