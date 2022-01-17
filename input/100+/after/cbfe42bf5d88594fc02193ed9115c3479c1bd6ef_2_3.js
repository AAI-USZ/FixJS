function(){
    var key,
        region,
        map = this;

    for (key in this.mapData.paths) {
      region = this.canvas.addPath({
        d: this.mapData.paths[key].path,
        "data-code": key
      }, $.extend({}, this.params.regionStyle));
      $(region.node).bind('selected', function(e, isSelected){
        map.container.trigger('regionSelected.jvectormap', [$(this).attr('data-code'), isSelected, map.getSelectedRegions()]);
      });
      region.addClass('jvectormap-region');
      this.regions[key] = {
        element: region,
        config: this.mapData.paths[key]
      };
    }
  }