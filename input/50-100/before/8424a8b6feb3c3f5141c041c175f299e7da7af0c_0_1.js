function show_hosts_history(event){
    var selected = $(selected_objects());
    if (selected.size() < 1) {
        show_error_dialog("対象がなにも選択されていません");
        return false;
    };
    window.location.href = '/ybz/host/history/' + selected.get().join('-');
}