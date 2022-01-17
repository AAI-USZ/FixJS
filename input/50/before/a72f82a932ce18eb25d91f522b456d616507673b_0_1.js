function initialize_filemgr() {

    if (current_type == 'dir') {
        filemgr_get_file_list();
    }
    else { //is file
      filemgr_get_file_details();
    }

    build_breadcrumbs();
}