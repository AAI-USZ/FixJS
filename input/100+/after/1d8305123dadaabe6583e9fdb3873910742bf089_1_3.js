function(){
            ClaroUtils.sendRequest(route, function(data){
                $('#ct_tree').hide();
                $('#ct_form').append(data);
                $('#ct_form').find('form').submit(function(e){
                    e.preventDefault();
                    var action = $('#ct_form').find('form').attr('action');
                    action = action.replace('_instanceId', node.data.key);
                    var id = $('#ct_form').find('form').attr('id');
                    ClaroUtils.sendForm(action, document.getElementById(id), submissionHandler);
                })
            })
        }