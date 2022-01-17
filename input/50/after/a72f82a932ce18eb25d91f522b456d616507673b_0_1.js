function filemgr_view_file(e) {
    e.preventDefault();
    filemgr_get_file_details($(this).parent('li').attr('title'));
}