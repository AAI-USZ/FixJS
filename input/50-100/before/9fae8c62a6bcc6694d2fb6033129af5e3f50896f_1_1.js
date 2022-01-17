function(data){
                if (data['success']){
                    me.setOn(data['is_member']);
                } else {
                    showMessage(me.getElement(), data['message']);
                }
            }