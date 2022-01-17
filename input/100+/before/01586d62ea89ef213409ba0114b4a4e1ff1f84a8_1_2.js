function (map,o) {
      var curleft = curtop = 0;
      var obj = map._container;
      if (obj.offsetParent) {
        // Modern browsers
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return map.containerPointToLayerPoint(new L.Point(o.pos.x - curleft,o.pos.y - curtop))
      } else {
        // IE
        return map.mouseEventToLayerPoint(o.e)
      }
    }