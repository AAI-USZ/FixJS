function(node){
                node.appendAjax({
                    url:Routing.generate('claro_resource_node', {
                        'instanceId':node.data.key,
                        'workspaceId':node.data.workspaceId,
                        'format': 'json'
                    })
                });
            }