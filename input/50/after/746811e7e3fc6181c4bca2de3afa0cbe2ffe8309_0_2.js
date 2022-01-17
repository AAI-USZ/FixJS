function () {
        $('#profiles_listview').hide();
        $('#profiles_gridview').show();
        hash_set_value('view', 'grid');
        redraw_grid();
    }