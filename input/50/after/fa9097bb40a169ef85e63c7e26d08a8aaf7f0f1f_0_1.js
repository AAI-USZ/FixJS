function( node ) {
      var parentNode = node.parentNode
      movePreservingRanges(parentNode, parentNode.previousSibling, -1, range);
    }