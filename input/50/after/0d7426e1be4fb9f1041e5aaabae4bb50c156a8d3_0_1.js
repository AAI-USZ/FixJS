function(layer, index) {
    if (layer.getVisible()) {
      var layerRenderer = this.getLayerRenderer(layer);
      f.call(opt_obj, layer, layerRenderer, index);
    }
  }