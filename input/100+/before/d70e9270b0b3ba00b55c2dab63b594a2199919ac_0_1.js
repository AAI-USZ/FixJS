function(key, options) {
                switch(key)
                {
                    case 'open': openNode(node); break;
                    case 'delete':deleteNode(node); break;
                    case 'options': optionsNode(node); break;
                    case 'workspace_properties': workspaceRightNode(node); break;
                    case 'copy': copyNode(node); break;
                    case 'paste': pasteNode(node); break;
                    case 'cut': cutNode(node); break;
                    default:node = $.ui.dynatree.getNode(this);
                        createFormDialog(key, node.data.key, node);break;
                }
            }