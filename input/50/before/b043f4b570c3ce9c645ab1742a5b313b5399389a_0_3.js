function(nodeName, node, songString) {
                    if (nodeName === 'div' && node[0].className === 'gui-ubb-ref') {
                        return '[ref]'+songString+'[/ref]';
                    }
                }