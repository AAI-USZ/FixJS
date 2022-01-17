function cell_delete_output(id) {
    /*
    Ask the server to delete the output of a cell.

    INPUT:
        id -- integer or string; cell id
    */
    id = toint(id);

    if ($.inArray(id, queue_id_list) !== -1) {
        // Deleting a running cell causes evaluation to be interrupted.
        // In most cases this avoids potentially tons of confusion.
        async_request(worksheet_command('interrupt'));
    }
    async_request(worksheet_command('delete_cell_output'),
                  cell_delete_output_callback, {
                      id: id
                  });
    //update jmol applet list
    jmol_delete_check();

}