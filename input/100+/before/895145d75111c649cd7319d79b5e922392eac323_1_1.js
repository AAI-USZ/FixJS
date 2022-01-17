function() {
            var baseLayers = {};

            baseLayers.gphy = new OpenLayers.Layer.Google(
                "Google Physical",
                {type: google.maps.MapTypeId.TERRAIN}
            );
            baseLayers.gmap = new OpenLayers.Layer.Google(
                "Google Streets",
                {numZoomLevels: 20}
            );
            baseLayers.ghyb = new OpenLayers.Layer.Google(
                "Google Hybrid",
                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
            );
            baseLayers.gsat = new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
            );
            baseLayers.osm = new OpenLayers.Layer.OSM();

            if (OpenLayers.Layer.Stamen !== undefined) {
                var attribution =
                    'Map tiles by <a href="http://stamen.com">Stamen ' +
                    'Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC ' +
                    'BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
                    'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
                baseLayers.swc = new OpenLayers.Layer.Stamen(
                    "Stamen Watercolor",
                    { provider: 'watercolor', attribution: attribution }
                );
                baseLayers.stn = new OpenLayers.Layer.Stamen(
                    "Stamen Toner",
                    { provider: 'toner',      attribution: attribution }
                );
                baseLayers.str = new OpenLayers.Layer.Stamen(
                    "Stamen Terrain",
                    { provider: 'terrain',    attribution: attribution }
                );
            }

            return baseLayers;
        }