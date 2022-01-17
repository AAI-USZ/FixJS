function switch_views(view) {
    unbind_events();
    if (ProfilesLib.number_of_reps === 0) {
        ProfilesLib.gridview_elm.hide();
        ProfilesLib.listview_elm.hide();
        ProfilesLib.noresults_elm.show();
    }
    else if (view === 'list') {
        ProfilesLib.noresults_elm.hide();
        ProfilesLib.gridview_elm.hide();
        ProfilesLib.listview_elm.show();
    }
    else {
        ProfilesLib.noresults_elm.hide();
        ProfilesLib.listview_elm.hide();
        ProfilesLib.gridview_elm.show();
    }
    hash_set_value('view', view);
    bind_events();
}