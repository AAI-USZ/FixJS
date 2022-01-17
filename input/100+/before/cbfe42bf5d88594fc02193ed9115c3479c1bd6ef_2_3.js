function(){
    var key;

    for(key in this.mapData.paths) {
      this.regions[key] = {
        element: this.canvas.addPath({
          d: this.mapData.paths[key].path,
          "data-code": key
        }, $.extend({}, this.params.regionStyle)),
        config: this.mapData.paths[key]
      }
      this.regions[key].element.addClass('jvectormap-region');
    }
  }