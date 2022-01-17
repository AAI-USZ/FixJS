function (node) {
                            if (params.mode == 'picker'){
                                params.resourcePickedHandler(node.data.key);
                            } else {
                                node.expand();
                                node.activate();
                            }
                        }