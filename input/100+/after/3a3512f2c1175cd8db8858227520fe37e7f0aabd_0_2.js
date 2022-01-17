function(editor) {
      if(!$(document.activeElement).is(".preview")){
        return {};
      }

      checkCaret(0);

      function getParents(node, content){
        // TODO document me! why is this here?
        if(content){
          var contentNodeName = content.nodeName,
          nodeNodeName = node[0].nodeName;
          if(contentNodeName != "#text" && nodeNodeName != "#text" && nodeNodeName != contentNodeName){
            node = node.find(content.nodeName.toLowerCase());
          }
        }

        return node.parentsUntil(".preview").add(node);
      }
      
      var nodes = [], startNodes, endNodes,
      content = selection.getRangeAt(0).cloneContents().firstChild;

      startNodes = getParents(startNode(), content);
      endNodes = getParents(endNode(), content);

      if(/(u|o)l/i.test(startNodes[0].nodeName) && startNodes[0].nodeName !== endNodes[0].nodeName){
        nodes = startNodes.toArray();
        nodes[0] = $('<p>')[0];
      } else {
        nodes = startNodes;
      }
      return this.buildStateObject(nodes, editor.currentNodes = {});
    }