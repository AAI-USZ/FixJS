function () {
    var yourStartLatLng = new window.google.maps.LatLng(-19.926615, -43.937759);
    var content = '<b>UNA Aimor&eacute;s</b>';
    content += '<br />Audit&oacute;rio Ministro Carlos M&aacute;rio Veloso';
    content += '<br />Rua Aimor&eacute;s, 1451 - Funcion&aacute;rios, Belo Horizonte';

    window.$('#map_canvas').gmap({ 'center': yourStartLatLng });
    window.$('#map_canvas').gmap('option', 'zoom', 13);
    window.$('#map_canvas').gmap('addMarker', { /*id:'m_1',*/'position': '-19.926615, -43.937759', 'bounds': false }).click(function () {
        window.$('#map_canvas').gmap('openInfoWindow', { 'content': content }, this);
    });

}