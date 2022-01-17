function () {
    var yourStartLatLng = new google.maps.LatLng(-19.926615, -43.937759);
    var content = '<b>UNA Aimor&eacute;s</b>';
    content += '<br />Audit&oacute;rio Ministro Carlos M&aacute;rio Veloso';
    content += '<br />Rua Aimor&eacute;s, 1451 - Funcion&aacute;rios, Belo Horizonte';

    $('#map_canvas').gmap({ 'center': yourStartLatLng });
    $('#map_canvas').gmap('option', 'zoom', 13);
    $('#map_canvas').gmap('addMarker', { /*id:'m_1',*/'position': '-19.926615, -43.937759', 'bounds': false }).click(function () {
        $('#map_canvas').gmap('openInfoWindow', { 'content': content }, this);
    });

}