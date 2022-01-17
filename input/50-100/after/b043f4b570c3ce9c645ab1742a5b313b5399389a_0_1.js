function(nodeName, node, sonString) {
                    if (nodeName === 'ul') {
                        return '[ul]\n'+sonString+'\n[/ul]';
                    }
                    // in IE <= 7, node is block
                    if (nodeName === 'li' && !Util.isBlock(node)) {
                        var parent = node.parent()[0];
                        // if its parent is ul and it's not the last node
                        if (parent && parent.nodeName.toLowerCase() === 'ul' && node.next().length) {
                            return sonString + '\n';
                        }
                    }
                }