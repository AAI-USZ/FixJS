function (coord, zoom, ownerDocument) {
    var me = this;

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

    var div = ownerDocument.createElement("DIV");
    var addr = this.getAddrLatLng(coord, zoom);
    var url = "http://api.wikimapia.org/?function=box&bbox=" + addr + "&format=json&key=" + this.key;
    div.tileKey = addr;
    //if (this.komooMap.options.debug) {
        // Display debug info.
        $(div).css({
            "width": this.tileSize.width + "px",
            "height": this.tileSize.height + "px",
            "border": "solid 1px #AAAAAA",
            "overflow": "hidden",
            "font-size": "9px"
        });
    //}

    // Verify if we already loaded this block.
    if (this.komooMap.fetchedTiles[addr]) {
        //if (this.komooMap.options.debug) {
            // Display debug info.
            div.innerHTML = JSON.stringify(this.komooMap.fetchedTiles[addr].geojson);
        //}
        return div;
    }
    if (this.komooMap.options.fetchOverlays != false) {
        $.ajax({
            url: url,
            dataType: "json",
            type: "GET",
            success: function (data, textStatus, jqXHR) {
                var overlays = createOverlays(data);
                me.komooMap.fetchedTiles[addr] = {
                    json: data,
                    overlays: overlays
                };
                overlays.forEach(function (overlay, index, orig) {
                    if (!me.loadedOverlays[overlay.wikimapia_id]) {
                        overlay.setMap(me.komooMap.googleMap);
                        me.loadedOverlays[overlay.wikimapia_id] = overlay;
                    }
                });
                //if (me.komooMap.options.debug) {
                    // Display debug info.
                    div.innerHTML = JSON.stringify(data);
                    $(div).css("border", "solid 1px #F00");
                //}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (window.console) console.error(textStatus);
            }
        });
    }
    return div;
}