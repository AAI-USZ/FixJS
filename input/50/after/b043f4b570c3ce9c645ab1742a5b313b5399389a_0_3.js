function(nodeName, node, sonString) {
                    if (nodeName === 'div' && node[0].className === 'gui-ubb-ref') {
                        return '[ref]'+sonString+'[/ref]';
                    }
                }