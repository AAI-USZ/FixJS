function (node, sourceNode, hitMode, ui, draggable) {
                                if (node.isDescendantOf(sourceNode)) {
                                    return false;
                                }
                                else {
                                    dropNode(node, sourceNode, hitMode);
                                }
                            }