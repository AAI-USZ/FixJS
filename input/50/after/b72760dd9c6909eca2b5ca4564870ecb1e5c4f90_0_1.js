function() {
        $chart.parent().removeClass('nodata');
        $chart.addClass('loading');
        $btnZoom.addClass('inactive').click(_pd);
    }