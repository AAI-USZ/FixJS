function(){
    portal_url = $('div.multidata').data('portal_url');
    icon_url = '/++resource++map_pin.png';
    icon_url = portal_url+icon_url;

    marker_layer = new OpenLayers.Layer.Markers( "Markers" );
    map = new OpenLayers.UrbisMap({div:"urbis_map", lang: $('div.multidata').data('lang')});

    json_url = $('div.multidata').data('absolute_url')+"/json";
    $.getJSON(json_url, function(data){
        json = data;
        create_points();
    });
    map.setCenter(new OpenLayers.LonLat(149642,171451), 1); 

    $('li.orga').hover(function(){
        id_current = $(this).data('idorga');
        lat_current = $(this).data('latorga');
        lon_current = $(this).data('lonorga');
        for (i in json) {
            mark = json[i];
            if (mark.orga.y == lat_current && mark.orga.x == lon_current) {
                icon_blue_url = '/++resource++map_blue_pin.png';
                icon_blue_url = portal_url+icon_blue_url;
                mark.orga.icon = icon_blue_url;
                create_points();
            } else {
                mark.orga.icon = icon_url;
            }
        }
    });
}