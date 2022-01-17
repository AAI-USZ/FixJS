function dropNode(node, sourceNode, hitMode)
                    {
                        console.debug(node);
                        $('#ct_form').empty();
                        $('#ct_form').append(moveForm);
                        $('#move_resource_form_submit').click(function (e) {
                            e.preventDefault();
                            var option = ClaroUtils.getCheckedValue(document.forms['move_resource_form']['options']);
                            var route = {}
                            if ('move' == option) {
                                route = {
                                    'name': 'claro_resource_move',
                                    'parameters': {
                                        'instanceId': sourceNode.data.key,
                                        'newParentId': node.data.key
                                    }
                                };
                                ClaroUtils.sendRequest(route);
                                sourceNode.move(node, hitMode);
                                $('#ct_form').empty();
                            } else {
                                route = {
                                    'name': 'claro_resource_add_workspace',
                                    'parameters': {
                                        'instanceId': sourceNode.data.key,
                                        'instanceDestinationId': node.data.key,
                                        'options': option
                                    }
                                }
                                ClaroUtils.sendRequest(route);
                                var newNode = {
                                    title: sourceNode.data.title,
                                    key: sourceNode.data.key,
                                    copy: sourceNode.data.copy,
                                    instanceCount: sourceNode.data.instanceCount,
                                    shareType: sourceNode.data.shareType,
                                    resourceId: sourceNode.data.resourceId,
                                    isFolder: sourceNode.data.isFolder,
                                    isLazy: true
                                }
                                node.addChild(newNode);
                                $('#ct_form').empty();
                            }
                        });
                    }