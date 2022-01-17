function responseHandler(response, viz_name, rf_interval) {
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
          
        $("#"+ viz_name).html(format_num( Math.round(diff / 1000)) + " s  ");
        if (diff / 1000 > 2 * rf_interval) {
            $("#" + viz_name).css('color', 'red');
            $("#" + viz_name).css('font-face', 'bold');
       }
       else {
          $("#"+ viz_name).css('color', 'black');
      } 
    }