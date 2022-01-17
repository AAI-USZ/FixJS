function switch_views(view) {
    unbind_events();
    if (ProfilesLib.number_of_reps === 0) {
        $('#profiles_gridview').hide();
        $('#profiles_listview').hide();
        $('#profiles_noresults').show();
    }
    else if (view === 'list') {
        $('#profiles_noresults').hide();
        $('#profiles_gridview').hide();
        $('#profiles_listview').show();
    }
    else {
        $('#profiles_noresults').hide();
        $('#profiles_listview').hide();
        $('#profiles_gridview').show();
    }
    hash_set_value('view', view);
    bind_events();
}