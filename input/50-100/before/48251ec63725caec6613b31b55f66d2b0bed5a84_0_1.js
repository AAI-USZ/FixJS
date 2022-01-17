function () {
    M.block_ajax_marking.show_error(M.str.block_ajax_marking.connecttimeout);
    M.block_ajax_marking.get_current_tab().displaywidget.rebuild_parent_and_tree_count_after_new_nodes();
    YAHOO.util.Dom.removeClass(this.icon, 'loaderimage');
}