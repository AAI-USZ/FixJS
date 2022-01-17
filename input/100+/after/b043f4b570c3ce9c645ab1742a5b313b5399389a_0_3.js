function(nodeName, node, sonString) {
                    if (nodeName === '#text') {
                        var container = node.parent();
                        if (Util.isBold(container.css('font-weight'))) {
                            return '[bold]'+sonString+'[/bold]';
                        }
                    }
                }