function evaluate_text_cell_input(id, value, settings) {
    /*
    Send the input text of the current cell back to the server.

    INPUT:
       id -- integer or string; cell id
       value -- string; new cell contents
       settings -- object
    OUTPUT:
       makes an async call back to the server sending the input text.
    */
    async_request(worksheet_command('eval'), evaluate_text_cell_callback, {
        text_only: 1,
        id: id,
        input: value
    });
}