function(id_list, elements, action_type){
        if (action_type == 'delete' || action_type == 'mark_new' || action_type == 'mark_seen' || action_type == 'remove_flag' || action_type == 'close' || action_type == 'delete_post'){
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                data: JSON.stringify({memo_list: id_list, action_type: action_type}),
                url: askbot['urls']['manageInbox'],
                success: function(response_data){
                    if (response_data['success'] === true){
                        if (action_type == 'delete' || action_type == 'remove_flag' || action_type == 'close' || action_type == 'delete_post'){
                            elements.remove();
                        }
                        else if (action_type == 'mark_new'){
                            elements.addClass('highlight');
                            elements.addClass('new');
                            elements.removeClass('seen');
                        }
                        else if (action_type == 'mark_seen'){
                            elements.removeClass('highlight');
                            elements.addClass('seen');
                            elements.removeClass('new');
                        }
                    }
                    else {
                        showMessage($('#responses'), response_data['message']);
                    }
                }
            });
        }
    }