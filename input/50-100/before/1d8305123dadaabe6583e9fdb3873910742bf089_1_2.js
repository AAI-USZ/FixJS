function(e){
                e.preventDefault();
                var action = $('#ct_form').find('form').attr('action');
                action = action.replace('_instanceId', node.data.key);
                action = action.replace('_resourceId', node.data.resourceId);
                var id = $('#ct_form').find('form').attr('id');
                sendForm(action, document.getElementById(id), node);
            }