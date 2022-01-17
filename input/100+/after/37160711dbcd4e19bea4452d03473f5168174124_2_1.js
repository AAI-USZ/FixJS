function(id){
            $('#bootstrap-modal').modal("hide");
            var route = {
                'name': 'claro_resource_add_workspace',
                'parameters': {
                    'instanceId': id,
                    'instanceDestinationId': sourceId,
                    'options': 'ref'
                }
            }

            ClaroUtils.sendRequest(route, function(data){
                var node = $('#ws_tree').dynatree('getTree').selectKey(sourceId);
                node.appendAjax({
                    url: Routing.generate('claro_resource_children', {
                        'instanceId': sourceId
                    }),
                    error: function (node, XMLHttpRequest, textStatus, errorThrown) {
                        if (XMLHttpRequest.status == 403) {
                            ClaroUtils.ajaxAuthenticationErrorHandler(function () {
                                window.location.reload();
                            });
                        } else {
                            alert('this node could not be loaded');
                        }
                    }
                });
                alert(data);
            });
        }