function insertAdjacent(node, where, content) {
  var elem = node.elem;

  // skip if content is empty
  var move = content.length;
  if (move === 0) return;

  // insert content and move the parts all parts except
  // "moveParentSiblings" since that will always be needed
  insertAdjacentMethods[where](node, elem, content, move);

  // move all next siblings to this element
  moveParentSiblings(elem, move);
}