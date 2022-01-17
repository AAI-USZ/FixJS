function(results, status) {
        if (status == google.maps.ElevationStatus.OK) {

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Sample');
            data.addColumn('number', 'Elevation');
            for (var i = 0; i < results.length; i++) {
              data.addRow(['', parseInt((results[i].elevation * 3.2808399), 10)]);
            }

            // Draw the chart
            var chart = new google.visualization.ColumnChart(document.getElementById('elevation_chart_image'));
            document.getElementById('elevation_chart_image').style.display = 'block';
            chart.draw(data, {
                width: 300,
                height: 110,
                legend: 'none',
                fontSize: 12
            });
        }

        $("#elevation_chart").show();
    }