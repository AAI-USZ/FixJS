function evaluate_cell(id, newcell) {
    /*
    Evaluates a cell.

    INPUT:
        id -- integer or string; cell id
        newcell -- boolean; whether to request insertion of a new cell
                   after the current one
    */
    var cell_input;

    if (worksheet_locked) {
        alert(translations['This worksheet is read only. Please make a copy or contact the owner to change it.']);
        return;
    }

    // Does the input cell exist?
    id = toint(id);
    cell_input = get_cell(id);
    if (!cell_input) {
        return;
    }

    // Request a new cell to insert after this one?
    newcell = (newcell || (id === extreme_compute_cell(-1))) ? 1 : 0;
    if (evaluating_all) {
        newcell = 0;
    }

    // Don't resend the input to the server upon leaving focus (see
    // send_cell_input).
    cell_has_changed = false;

    // Ask the server to start computing.
    async_request(worksheet_command('eval'), evaluate_cell_callback, {
        newcell: newcell,
        id: id,
        input: cell_input.value
    });
}