function(e){
      var path = this,
          type = $(this).attr('class').indexOf('jvectormap-region') === -1 ? 'marker' : 'region',
          code = type == 'region' ? $(this).attr('data-code') : $(this).attr('data-index'),
          clickEvent = $.Event(type+'Click.jvectormap'),
          element = type == 'region' ? map.regions[code].element : map.markers[code].element;

      if (!mouseMoved) {
        map.container.trigger(clickEvent, [code]);
        if ((type === 'region' && map.params.regionsSelectable) || (type === 'marker' && map.params.markersSelectable)) {
          if (!clickEvent.isDefaultPrevented()) {
            element.setSelected(!element.isSelected);
            map.container.trigger(
              type+(element.isSelected ? 'Select' : 'Deselect')+'.jvectormap',
              [code, type === 'marker' ? map.getSelectedMarkers() : map.getSelectedRegions()]
            );
          }
        }
      }
    }