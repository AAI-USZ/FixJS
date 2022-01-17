function (o) {

    var errormessage;
    var ajaxresponsearray;
    var currenttab = M.block_ajax_marking.get_current_tab();

    try {
        ajaxresponsearray = YAHOO.lang.JSON.parse(o.responseText);
    } catch (error) {
        // add an empty array of nodes so we trigger all the update and cleanup stuff
        errormessage = '<strong>An error occurred:</strong><br />';
        errormessage += o.responseText;
        M.block_ajax_marking.show_error(errormessage);
    }

    // first object holds data about what kind of nodes we have so we can
    // fire the right function.
    if (typeof(ajaxresponsearray) === 'object') {

        // If we are doing something with a specific node, this will be there
        var index = false;
        if (ajaxresponsearray.nodeindex) {
            index = ajaxresponsearray.nodeindex;
        }

        // If we have a neatly structured Moodle error, we want to display it
        if (ajaxresponsearray.hasOwnProperty('error')) {

            errormessage = '';

            // Special case for 'not logged in' message
            if (ajaxresponsearray.hasOwnProperty('debuginfo') &&
                ajaxresponsearray.debuginfo == 'sessiontimedout') {

                M.block_ajax_marking.show_error(ajaxresponsearray.error, true);

            } else {
                // Developer message.
                errormessage += '<strong>A Moodle error occurred:</strong><br />';
                errormessage += ajaxresponsearray.error;
                if (ajaxresponsearray.hasOwnProperty('debuginfo')) {
                    errormessage += '<br /><strong>Debug info:</strong><br />';
                    errormessage += ajaxresponsearray.debuginfo;
                }
                if (ajaxresponsearray.hasOwnProperty('stacktrace')) {
                    errormessage += '<br /><strong>Stacktrace:</strong><br />';
                    errormessage += ajaxresponsearray.stacktrace;
                }
                M.block_ajax_marking.show_error(errormessage);
                // The tree will fail to expand its nodes after refresh unless we tell it
                // that this operation to expand a node worked.
                currenttab.displaywidget.locked = false;
            }

        } else if (typeof(ajaxresponsearray['gradinginterface']) !== 'undefined') {
            // We have gotten the grading form back. Need to add the HTML to the modal overlay
            // M.block_ajax_marking.gradinginterface.setHeader('');
            // M.block_ajax_marking.gradinginterface.setBody(ajaxresponsearray.content);

        } else if (typeof(ajaxresponsearray['counts']) !== 'undefined') {
            currenttab.displaywidget.update_node_count(ajaxresponsearray.counts, index);
        } else if (typeof(ajaxresponsearray['childnodecounts']) !== 'undefined') {
            currenttab.displaywidget.update_child_node_counts(ajaxresponsearray.childnodecounts,
                                                              index);
        } else if (typeof(ajaxresponsearray['nodes']) !== 'undefined') {
            currenttab.displaywidget.build_nodes(ajaxresponsearray.nodes, index);
        } else if (typeof(ajaxresponsearray['configsave']) !== 'undefined') {

            if (ajaxresponsearray['configsave'].success !== true) {
                M.block_ajax_marking.show_error('Config setting failed to save');
            } else {
                // Maybe it's a contextmenu settings change, maybe it's an icon click.
                if (ajaxresponsearray['configsave'].menuitemindex !== false) {
                    // We want to toggle the display of the menu item by setting it to
                    // the new value. Don't assume that the default hasn't changed.
                    M.block_ajax_marking.contextmenu_ajax_callback(ajaxresponsearray);
                } else { // assume a nodeid
                    M.block_ajax_marking.config_icon_success_handler(ajaxresponsearray);
                }

                // Notify other trees to refresh now that settings have changed
                M.block_ajax_marking.get_current_tab().displaywidget.notify_refresh_needed_after_config();
            }
        }
    }

    // TODO this needs to get the right tab from the request details in case we switch tabs quickly
    M.block_ajax_marking.get_current_tab().displaywidget.remove_loading_icon();

}