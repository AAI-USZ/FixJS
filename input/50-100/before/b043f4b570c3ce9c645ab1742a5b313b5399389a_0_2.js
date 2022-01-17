function(nodeName, node, songString) {
                    if (nodeName === 'ol') {
                        return '[ol]\n'+songString+'\n[/ol]';
                    }
                    if (nodeName === 'li') {
                        var parent = node.parent()[0];
                        // if its parent is ul and it's not the last node
                        if (parent && parent.nodeName.toLowerCase() === 'ol' && node.next().length) {
                            return songString + '\n';
                        }
                    }
                }