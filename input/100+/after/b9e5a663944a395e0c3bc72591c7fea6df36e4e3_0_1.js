function(json, text, jqXHR) {
      if (json.hasOwnProperty("error")) {
        alert("Произошла ошибка!\n"+json.error);
      } else {
        hell.map.markergroup.clearLayers();
        for(var i=0;i<json.data.length;i++) {
          // каждую точку сложить в одно сообщение
          var point = json.data[i];
          var marker = new L.Marker(new L.LatLng(point.lat, point.lon));
          var popupText = $.tmpl(tmpl, point).html();
          marker.bindPopup(popupText);
          marker.setIcon(hell.map.mcolors[0]);
          hell.map.markergroup.addLayer(marker);
          hell.map.allmarkers[point.id] = marker;
          marker._json = point;
        }
      }
    }