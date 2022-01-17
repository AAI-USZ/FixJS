function(feature, viewedArea) {
            if(feature.geometry.CLASS_NAME == "OpenLayers.Geometry.Polygon" ||
               feature.geometry.CLASS_NAME == "OpenLayers.Geometry.MultiPolygon")
            {
                var alpha =  0.5 - 0.5 * Math.min(1, feature.geometry.getArea()/viewedArea);
                var polyStyle = $.extend({}, 
                          feature.layer.styleMap.styles['default'].defaultStyle,
                          { fillOpacity: alpha });
                feature.style = polyStyle;
                feature.defaultStyle = polyStyle;
                feature.layer.drawFeature(feature);
            }
        }