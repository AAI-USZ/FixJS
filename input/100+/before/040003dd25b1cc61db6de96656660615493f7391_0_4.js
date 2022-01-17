function createOverlays(json) {
        var overlays = komoo.collections.makeFeatureCollection({map: me.komooMap});
        var folder = json.folder;
        folder.forEach(function (item, index, orig) {
            var coords = [];
            item.polygon.forEach(function (point, index, orig) {
                coords.push(new google.maps.LatLng(point.y, point.x));
            });
            var polygon = new google.maps.Polygon({paths: [coords], fillColor: 'gray'});
            polygon.wikimapia_id = item.id;
            polygon.wikimapia_name = item.name;
            overlays.push(polygon)
        });
        return overlays;
    }