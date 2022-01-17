function(evt, ui) {
        /* Drag & drop for changing contexts */
        var target = $(this).parent().get();
        var dragged_todo = ui.draggable[0].id.split('_')[2];
        var context_id = this.id.split('_')[1];
        ui.draggable.remove();
        $('.drop_target').hide();

        ajax_options = default_ajax_options_for_scripts('POST', relative_to_root('todos/'+dragged_todo + '/change_context'), target);
        ajax_options.data += "&todo[context_id]="+context_id
        $.ajax(ajax_options);
    }