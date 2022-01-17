function(){

        var cur_id = find_dir_index($(this).attr('id'));

        var initial_dir = $("#new_root_dir_"+cur_id).val();

        $(this).nFileBrowser(edit_root_dir, {initialDir: initial_dir, which_id: cur_id});

        

    }