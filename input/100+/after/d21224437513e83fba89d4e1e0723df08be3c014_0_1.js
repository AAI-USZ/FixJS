function(blocknode) {
                    var move = blocknode.one('a.'+CSS.EDITINGMOVE);
                    if (move) {
                        move.remove();
                        blocknode.one('.'+CSS.HEADER).setStyle('cursor', 'move');
                        // Make each div element in the list of blocks draggable
                        var dd = new Y.DD.Drag({
                            node: blocknode,
                            groups: this.groups,
                            // Make each div a Drop target too
                            target: true,
                            handles: ['.'+CSS.HEADER]
                        }).plug(Y.Plugin.DDProxy, {
                            // Don't move the node at the end of the drag
                            moveOnEnd: false
                        }).plug(Y.Plugin.DDWinScroll);
                    }
                }