function(results, status) {
        if (status == google.maps.ElevationStatus.OK) {
            var elevals = [];
            for (var i = 0; i < results.length; i++) {
                elevals[i] = parseInt((results[i].elevation * 3.2808399) / 10, 10);
            }

            $("#elevation_chart_image").html('<img width="400" height="110" src="https://chart.googleapis.com/chart?cht=lc&chs=400x110&chd=t:' + elevals.join(",") + '&chco=224499&chxt=y&chxl=0:|0|200|400|600|800|1000&chm=B,76A4FB,0,0,0" />');
        }

        $("#elevation_chart").show();
    }