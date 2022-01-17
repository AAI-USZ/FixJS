function(name, json) {
    var geojson_format, selectCtrl, styleMap, vector_layer;
    styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults({
      fillColor: GREEN,
      strokeColor: GREEN
    }, OpenLayers.Feature.Vector.style["default"]));
    styleMap.styles["default"].addRules([
      new OpenLayers.Rule({
        filter: new OpenLayers.Filter.Comparison({
          type: OpenLayers.Filter.Comparison.EQUAL_TO,
          property: "selected",
          value: true
        }),
        symbolizer: {
          fillColor: RED,
          strokeColor: RED
        }
      }), new OpenLayers.Rule({
        elseFilter: true
      })
    ]);
    geojson_format = new OpenLayers.Format.GeoJSON();
    vector_layer = new OpenLayers.Layer.Vector(name, {
      styleMap: styleMap
    });
    map.addLayer(vector_layer);
    vector_layer.addFeatures(geojson_format.read(json));
    selectCtrl = new OpenLayers.Control.SelectFeature(vector_layer, {
      callbacks: {
        click: function(feature) {
          return showPopup(feature);
        }
      }
    });
    map.addControl(selectCtrl);
    selectCtrl.activate();
    return vector_layer;
  }