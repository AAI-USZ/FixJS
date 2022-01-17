function(nodeName, node, sonString) {
                    if (nodeName === 'ol') {
                        return '[ol]\n'+sonString+'\n[/ol]';
                    }
                    // in IE <= 7, node is block
                    if (nodeName === 'li' && !Util.isBlock(node)) {
                        var parent = node.parent()[0];
                        // if its parent is ul and it's not the last node
                        if (parent && parent.nodeName.toLowerCase() === 'ol' && node.next().length) {
                            return sonString + '\n';
                        }
                    }
                }