function executeMenuActions(obj, node)
    {
        var executeAsync = function (obj, node, route) {
            var removeNode = function (node, route) {
                $.ajax({
                type: 'POST',
                url: route,
                success: function(data){
                    if(data == 'success'){
                    node.remove();
                        }
                    }
                });
            }

            var executeRequest = function (node, route) {
               $.ajax({
                    type: 'POST',
                    url: route,
                    cache: false,
                    success: function(data){
                        $('#ct_tree').hide();
                        $('#ct_form').append(data);
                        $('#ct_form').find('form').submit(function(e){
                            e.preventDefault();
                            var action = $('#ct_form').find('form').attr('action');
                            action = action.replace('_instanceId', node.data.key);
                            var id = $('#ct_form').find('form').attr('id');
                            sendForm(action, document.getElementById(id), node);
                        })
                    }
                });
            }

            switch(obj.name)
            {
                case "delete": removeNode(node, route); break;
                default: executeRequest (node, route); break;
            }

        }

        var route = obj.route;
        var compiledRoute = route.replace('_instanceId', node.data.key);
        compiledRoute = compiledRoute.replace('_resourceId', node.data.resourceId);

        (obj.async) ? executeAsync(obj, node, compiledRoute): window.location = compiledRoute;
    }