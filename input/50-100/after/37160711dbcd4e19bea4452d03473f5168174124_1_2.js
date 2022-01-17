function (node) {
                            if (params.mode == 'picker' && node.data.type != 'resourceType'){
                                (node.shareType == 0) ? alert("you can't share this resource"): params.resourcePickedHandler(node.data.key);
                            } else {
                                node.expand();
                                node.activate();
                            }
                        }