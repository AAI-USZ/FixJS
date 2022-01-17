function() {
        var id = $('.active a').attr('data-layer');
        $('.share .tilejson textarea').empty().text(tileUrl(id));
        $('.share .embed textarea').empty().text(
            "<iframe style='background-color: #000' width='500' height='300' " +
            "frameBorder='0' src='http://a.tiles.mapbox.com/v3/" + id + ".html" +
            "#11,40.7010,-74.0137'></iframe>"
        );
        $('.modal.share').stop().fadeIn(100);
    }