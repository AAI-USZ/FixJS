function(xhr){
        if(xhr.getResponseHeader('Content-Type') == 'application/json'){
            var JSONObject = JSON.parse(xhr.responseText);
            var instance = JSONObject[0];
            var newNode = {
                title:instance.title,
                key:instance.key,
                copy:instance.copy,
                instanceCount:instance.instanceCount,
                shareType:instance.shareType,
                resourceId:instance.resourceId
            }

            if (instance.type == 'directory'){
                newNode.isFolder = true;
            }

            if(node.data.key != newNode.key){
                node.appendAjax({
                    url:Routing.generate('claro_resource_node', {
                        'instanceId':node.data.key,
                        'workspaceId': document.getElementById(node.tree.divTree.attributes[0].value).getAttribute('data-workspaceId'),
                        'format': 'json'
                    })
                });
                node.expand();
            }
            else{
                node.data.title = newNode.title;
                node.data.shareType = newNode.shareType;
                node.render();
            }

            $('#ct_tree').show();
            $('#ct_form').empty();
        } else {
            $('#ct_form').empty();
            $('#ct_form').append(xhr.responseText);
            $('#ct_form').find('form').submit(function(e){
                e.preventDefault();
                var action = $('#ct_form').find('form').attr('action');
                action = action.replace('_instanceId', node.data.key);
                action = action.replace('_resourceId', node.data.resourceId);
                var id = $('#ct_form').find('form').attr('id');
                ClaroUtils.sendForm(action, document.getElementById(id), submissionHandler);
            })
        }
    }