function(nodeName, node, songString) {
                    if (nodeName === 'a') {
                        return '[url href='+node.attr('href')+']'+songString+'[/url]';
                    }
                }