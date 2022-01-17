function createOverlays(json) {
        var overlays = []
        var folder = json.folder;
        $.each(folder, function (i, item) {
            var coords = [];
            $.each(item.polygon, function (j, point) {
                coords.push(new google.maps.LatLng(point.y, point.x));
            });
            var polygon = new google.maps.Polygon({paths: [coords], fillColor: 'gray'});
            polygon.wikimapia_id = item.id;
            polygon.wikimapia_name = item.name;
            overlays.push(polygon)
        });
        return overlays;
    }