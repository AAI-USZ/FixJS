function evaluate_cell_callback(status, response) {
    /*
    Updates the queued cell list, marks a cell as running, changes the
    focus, inserts a new cell, and/or evaluates a subsequent cell,
    depending on the server response.  Also starts the cell update
    check.

    INPUT:
        status -- string
        response -- string; encoded JSON object with parsed keys

            id -- string or integer; evaluated cell's id
            command -- string; 'insert_cell', 'no_new_cell', or
            'introspect'
            next_id -- optional string or integer; next cell's id
            interact -- optional boolean; whether we're updating an
            interact
            new_cell_html -- optional string; new cell's contents
            new_cell_id -- optional string or integer; id of new cell
            to create

    */
    var X;
    if (status === "failure") {
        // alert("Unable to evaluate cell.");
        return;
    }

    X = decode_response(response);
    X.interact = X.interact ? true : false;

    if (X.id === -1) {
        // Something went wrong, e.g., the evaluated cell doesn't
        // exist.  TODO: Can we remove this?
        return;
    }

    if (X.command && (X.command.slice(0, 5) === 'error')) {
	// TODO: (Re)use an unobtrusive jQuery UI dialog.
    // console.log(X, X.id, X.command, X.message);
        return;
    }

    // Given a "successful" server response, we update the queued cell
    // list and mark the cell as running.
    queue_id_list.push(X.id);
    cell_set_running(X.id, X.interact);

    function go_next(evaluate, jump) {
        // Helper function that evaluates and/or jumps to a suggested
        // or the next compute cell, unless it's the current cell or
        // we're just updating an interact.
        var i, id, candidates = [X.next_id, id_of_cell_delta(X.id, 1)];

        if (X.interact) {
            return true;
        }
        for (i = 0; i < candidates.length; i += 1) {
            id = candidates[i];
            if (id !== X.id && is_compute_cell(id)) {
                if (evaluate) {
                    evaluate_cell(id, false);
                }
                if (jump) {
                    jump_to_cell(id, 0);
                }
                return true;
            }
        }
        return false;
    }

    if (evaluating_all) {
        // Evaluate the suggested next cell, another cell, or stop.
        if (!go_next(true, false)) {
            evaluating_all = false;
        }
    }

    if (X.command === 'insert_cell') {
        // Insert a new cell after the evaluated cell.
        do_insert_new_cell_after(X.id, X.new_cell_id, X.new_cell_html);
        jump_to_cell(X.new_cell_id, 0);
    } else if (X.command === 'introspect') {
	    introspect[X.id].loaded = false;
	    update_introspection_text(X.id, 'loading...');
    } else if (in_slide_mode || doing_split_eval ||
	           is_interacting_cell(X.id)) {
        // Don't jump.
    } else {
        // "Plain" evaluation.  Jump to a later cell.
        go_next(false, true);
    }

    start_update_check();
}