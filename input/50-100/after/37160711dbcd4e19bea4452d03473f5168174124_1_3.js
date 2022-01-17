function (node, sourceNode, hitMode, ui, draggable) {
                                if (node.isDescendantOf(sourceNode)) {
                                    return false;
                                }
                                else {
                                    if(node.data.shareType == 0){
                                        alert('this resource is private');
                                        return false;
                                    }

                                    dropNode(node, sourceNode, hitMode);
                                }
                            }