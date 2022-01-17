function(editor, nodeType){
      var range = selection.getRangeAt(0);

      editor.collapsed = range.collapsed;

      editor.leftBorder = new Border(startNode(), nodeType, 'previousSibling');
      editor.rightBorder = new Border(endNode(), nodeType, 'nextSibling');
      
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