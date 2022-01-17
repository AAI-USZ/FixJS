function(nodeName, node, sonString) {
                    if (nodeName === 'a') {
                        return '[url href='+node.attr('href')+']'+sonString+'[/url]';
                    }
                }