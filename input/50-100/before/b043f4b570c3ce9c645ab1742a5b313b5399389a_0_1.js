function(nodeName, node, songString) {
                    if (nodeName === 'ul') {
                        return '[ul]\n'+songString+'\n[/ul]';
                    }
                    if (nodeName === 'li') {
                        var parent = node.parent()[0];
                        // if its parent is ul and it's not the last node
                        if (parent && parent.nodeName.toLowerCase() === 'ul' && node.next().length) {
                            return songString + '\n';
                        }
                    }
                }