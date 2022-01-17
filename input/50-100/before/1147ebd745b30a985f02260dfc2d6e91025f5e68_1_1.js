function cell_delete(id) {
    /*
    Send a request back to the server that we would like to delete the
    cell with given id.

    INPUT:
        id -- integer or string; cell id
    */
    if ($.inArray(id, queue_id_list) !== -1) {
        // Deleting a running cell causes evaluation to be
        // interrupted.  In most cases this avoids potentially tons of
        // confusion.
        async_request(worksheet_command('interrupt'));
    }
    async_request(worksheet_command('delete_cell'), cell_delete_callback, {
        id: id
    });
}