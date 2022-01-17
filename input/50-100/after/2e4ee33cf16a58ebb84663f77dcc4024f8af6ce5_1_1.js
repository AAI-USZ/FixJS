function(child) {
                            if (cbfunc) {
                                cbfunc(child);
                            }
                        node.addChild(child);
                        removeLoading(node, child);
                        osg.log("success " + url);
                    }