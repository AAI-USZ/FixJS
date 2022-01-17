function(){

    var getSelected = function(){

        var id_list = new Array();
        var elements = $('#responses input:checked').parent();

        elements.each(function(index, element){
            var id = $(element).attr('id').replace(/^re_/,'');
            id_list.push(id);
        });

        if (id_list.length === 0){
            alert(gettext('Please select at least one item'));
        }

        return {id_list: id_list, elements: elements};
    };

    var submit = function(id_list, elements, action_type){
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
    };

    var startAction = function(action_type){
        var data = getSelected();
        if (data['id_list'].length === 0){
            return;
        }
        if (action_type == 'delete'){
            msg = ngettext('Delete this notification?',
					'Delete these notifications?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'close'){
            msg = ngettext('Close this entry?',
                    'Close these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'remove_flag'){
            msg = ngettext('Remove all flags on this entry?',
                    'Remove all flags on these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        if (action_type == 'delete_post'){
            msg = ngettext('Delete this entry?',
                    'Delete these entries?', data['id_list'].length);
            if (confirm(msg) === false){
                return;
            }
        }
        submit(data['id_list'], data['elements'], action_type);
    };
    setupButtonEventHandlers($('#re_mark_seen'), function(){startAction('mark_seen')});
    setupButtonEventHandlers($('#re_mark_new'), function(){startAction('mark_new')});
    setupButtonEventHandlers($('#re_dismiss'), function(){startAction('delete')});
    setupButtonEventHandlers($('#re_remove_flag'), function(){startAction('remove_flag')});
    setupButtonEventHandlers($('#re_close'), function(){startAction('close')});
    setupButtonEventHandlers($('#re_delete_post'), function(){startAction('delete_post')});
    setupButtonEventHandlers(
                    $('#sel_all'),
                    function(){
                        setCheckBoxesIn('#responses .new', true);
                        setCheckBoxesIn('#responses .seen', true);
                    }
    );
    setupButtonEventHandlers(
                    $('#sel_seen'),
                    function(){
                        setCheckBoxesIn('#responses .seen', true);
                    }
    );
    setupButtonEventHandlers(
                    $('#sel_new'),
                    function(){
                        setCheckBoxesIn('#responses .new', true);
                    }
    );
    setupButtonEventHandlers(
                    $('#sel_none'),
                    function(){
                        setCheckBoxesIn('#responses .new', false);
                        setCheckBoxesIn('#responses .seen', false);
                    }
    );

    setupButtonEventHandlers($('.re_expand'),
                    function(e){
                        e.preventDefault();
                        var re_snippet = $(this).find(".re_snippet:first")
                        var re_content = $(this).find(".re_content:first")
                        $(re_snippet).slideToggle();
                        $(re_content).slideToggle();
                    }
    );
}