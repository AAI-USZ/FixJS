function(name, options) {
            var provider = getProvider(name),
                url = provider.url,
                hosts = [];
            if (url.indexOf("{S}") > -1) {
                for (var i = 0; i < SUBDOMAINS.length; i++) {
                    hosts.push(openlayerize(url.replace("{S}", SUBDOMAINS[i])));
                }
            } else {
                hosts.push(openlayerize(url));
            }
            options = OpenLayers.Util.extend({
                "numZoomLevels":        provider.maxZoom,
                "buffer":               0,
                "transitionEffect":     "resize",
                // see: <http://dev.openlayers.org/apidocs/files/OpenLayers/Layer/OSM-js.html#OpenLayers.Layer.OSM.tileOptions>
                // and: <http://dev.openlayers.org/apidocs/files/OpenLayers/Tile/Image-js.html#OpenLayers.Tile.Image.crossOriginKeyword>
                "tileOptions": {
                    "crossOriginKeyword": null
                }
            }, options);
            return OpenLayers.Layer.OSM.prototype.initialize.call(this, name, hosts, options);
        }