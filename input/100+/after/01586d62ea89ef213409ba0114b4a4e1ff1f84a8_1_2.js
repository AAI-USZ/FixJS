function (map,o) {
      var curleft = curtop = 0;
      var obj = map._container;
      if (obj.offsetParent) {
        // Modern browsers
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return map.containerPointToLayerPoint(new L.Point(o.e.clientX - curleft,o.e.clientY - curtop))
      } else {
        // IE
        console.log(map.mouseEventToLayerPoint(o.e));
        return map.mouseEventToLayerPoint(o.e)
      }
    }