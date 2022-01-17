function (server_url, source, refresh_interval, viz_id, options) {
    return callback();

    function callback() {
        var gviz_url = server_url + "/wattdepot/sources/" +
            source + "/gviz/sensordata/latest?tq=select%20timePoint%2C%20powerConsumed";

        var query = new google.visualization.Query(gviz_url);
        query.setRefreshInterval(refresh_interval);

        // Set a callback to run when the data has been retrieved.
        query.send(function (response) {
            responseHandler(response, viz_id, refresh_interval);
        });
    }

    /** Once dorm data is retrieved, create and display the chart with tooltips. */
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

    // Add baseline value to the power data table
    // Column 0 contains the timestamp.
    // Column 1 contains the power value associated with that timestamp.
    // Column 2 contains baseline value
    function addBaseline(datatable) {
        // Create the data table of power values to return.
        var powerTable = new google.visualization.DataTable();
        var numPowerTableRows = 1;
        powerTable.addColumn('date'); // the time of day.
        powerTable.addColumn('number'); // the power in Wh.
        powerTable.addColumn('number'); // the baseline power in Wh.
        powerTable.addRows(numPowerTableRows);
        var timestampVal = datatable.getValue(0, 0);
        var powerVal = Number(datatable.getValue(0, 1).toFixed(0));
        var baselineVal = 3000;
        powerTable.setCell(0, 0, timestampVal);
        powerTable.setCell(0, 1, powerVal);
        powerTable.setCell(0, 2, baselineVal);
        var dateFormatter = new google.visualization.DateFormat({pattern:'MMM d, yyyy, h:mm:ss a'});
        dateFormatter.format(powerTable, 0);
        return powerTable;
    }

  function format_num(num) {
       return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}