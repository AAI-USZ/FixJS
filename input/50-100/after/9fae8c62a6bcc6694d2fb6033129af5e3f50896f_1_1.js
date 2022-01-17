function(data){
                if (data['success']){
                    var new_state = data['is_member'] ? 'on-state':'off-state';
                    me.setState(new_state);
                } else {
                    showMessage(me.getElement(), data['message']);
                }
            }