function(e) {
            e.preventDefault();
            var option = getCheckedValue(document.forms['move_resource_form']['options']);
            if('move' == option){
                sendRequest('claro_resource_move', {'idChild': sourceNode.data.key, 'idParent': node.data.key, 'workspaceDestinationId':node.data.workspaceId});
                sourceNode.move(node, hitMode);
                $('#ct_form').empty();
            } else
            {
                sendRequest('claro_resource_add_workspace',
                            {'instanceId':sourceNode.data.key,'instanceDestinationId':node.data.key,'options':option}
                );

                var newNode = {
                        title:sourceNode.data.title,
                        key:sourceNode.data.key,
                        copy:sourceNode.data.copy,
                        instanceCount:sourceNode.data.instanceCount,
                        shareType:sourceNode.data.shareType,
                        resourceId:sourceNode.data.resourceId
                    }

                node.addChild(newNode);
                $('#ct_form').empty();
            }
        }