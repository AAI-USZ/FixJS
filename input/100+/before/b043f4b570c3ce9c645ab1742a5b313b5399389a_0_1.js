function(nodeName, node, songString) {
                    if (nodeName === '#text') {
                        var container = node.parent();
                        if (Util.isBold(container.css('font-weight'))) {
                            return '[bold]'+songString+'[/bold]';
                        }
                    }
                }