function( node ) {
      var parentNode = node.parentNode
      console.log(parentNode);
      alert("");
      movePreservingRanges(parentNode, parentNode.previousSibling, -1, range);
    }