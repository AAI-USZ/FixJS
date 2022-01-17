function(layer, index) {
    var layerRenderer = this.getLayerRenderer(layer);
    f.call(opt_obj, layer, layerRenderer, index);
  }