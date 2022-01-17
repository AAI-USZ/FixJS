function (node){
                node.appendAjax({
                    url:Routing.generate('claro_resource_node', {
                        'instanceId':node.data.key,
                        'workspaceId':node.data.workspaceId,
                        'format': 'json'
                    }),
                    error: function (node, XMLHttpRequest, textStatus, errorThrown){
                        if(XMLHttpRequest.status == 403){
                            ClaroUtils.ajaxAuthenticationErrorHandler(function(){
                                window.location.reload();
                            });
                        } else {
                            alert("this node could not be loaded");
                        }
                    }
                });
            }