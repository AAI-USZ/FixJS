function() {
                var node = layerTree.getSelectionModel().getSelectedNode();
                if (node.parentNode.isRoot) {
                    Ext.Msg.alert(this.layerContainerText, "This category cannot be removed");
                    return false;
                }
                if (node) {

                    while (node.childNodes.length > 0) {
                        cnode = node.childNodes[0];
                        record = getRecordFromNode(cnode);
                        if (record) {
                            this.mapPanel.layers.remove(record, true);
                        }
                    }
                    ;
                    parentNode = node.parentNode;
                    parentNode.removeChild(node, true);
                }
            }