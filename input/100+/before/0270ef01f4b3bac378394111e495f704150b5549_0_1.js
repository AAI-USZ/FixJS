function responseHandler(response, viz_id, rf_interval) {
        // Process errors, if any.
        if (response.isError()) {
            debug('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        // Get the dorm data table.
        var datatable = response.getDataTable();

        // Get timestamp
        datatable = addBaseline(datatable);
        var lastUpdate = datatable.getFormattedValue(0, 0);
        var now = new Date();
        var then = new Date(lastUpdate);
        var diff = now.getTime() - then.getTime();
        $("#"+ viz_id).html(format_num(diff/1000) + " s");
        if(diff/1000 > 2 * rf_interval) {
            $("#"+ viz_id).css('color', 'red');
            $("#"+ viz_id).css('font-face', 'bold');
            $("#status").html('<blink>ERROR!</blink>');
            $("#status").css('font-face', 'bold');
            $("#status").css('color', 'red');
      }
    }