function(element) {
        var tile = element.tile;
        var lat = CesiumMath.toDegrees((tile.extent.north + tile.extent.south) * 0.5);
        var lon = CesiumMath.toDegrees((tile.extent.east + tile.extent.west) * 0.5);
        var zoomResponse = false;
        var validZoom = false;
        var loaded = false;

        jsonp(this._getMetadataUrl(), {
            parameters : {
                centerPoint : lat + ',' + lon,
                zoomLevel : tile.zoom
            },
            callbackParameterName : 'jsonp',
            proxy : this._proxy
        }).then(function(data) {
            if (typeof data.resourceSets[0] === 'undefined') {
                if (typeof element.onerror === 'function') {
                    element.onerror();
                }
                return;
            }

            var resource = data.resourceSets[0].resources[0];
            if (resource.vintageStart && resource.vintageEnd) {
                validZoom = true;
                if (loaded && typeof element.onload === 'function') {
                    element.onload();
                }
            } else if (typeof element.oninvalid === 'function') {
                element.oninvalid();
            }

            zoomResponse = true;
        });

        var image = element.image;
        image.onload = function() {
            if (zoomResponse && validZoom && typeof element.onload === 'function') {
                element.onload();
            }
            loaded = true;
        };
        image.onerror = element.onerror;
        image.crossOrigin = '';

        var quadkey = BingMapsTileProvider.tileXYToQuadKey(tile.x, tile.y, tile.zoom);
        var url = this._url.replace('{quadkey}', quadkey);
        if (typeof this._proxy !== 'undefined') {
            url = this._proxy.getURL(url);
        }

        image.src = url;
    }