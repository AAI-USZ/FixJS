function() {
  //var bnds = map.getBounds();
  bnds = new L.LatLngBounds(new L.LatLng(44.57,36.72), new L.LatLng(45.30, 39.04));
  var tmpl = "<div><table><tr><td><b>Город</b>:<td>${city}"+
  		    "<tr><td><b>Улица</b>:<td>${street}"+
  		    "<tr><td><b>Дом</b>:<td>${house}"+
  		    "<tr><td><b>Квартира</b>:<td>${flat}"+
  		    "<tr><td><b>Контактное лицо</b>:<td>${contact}"+
  		    "<tr><td><b>Телефон</b>:<td>${phone}"+
  		    "<tr><td><b>Что нужно</b>:<td>${required}"+
  		    "<tr><td><b>Доп. инфо.</b>:<td>${info}"+
  		    "<tr><td><b>Состояние жилья</b>:<td>${condition_house}"+
  	     "</table></div>";
  $.ajax({
    url: hell.p.urlapi+"/data",
    type: "GET",
    data: {
      action: "getpoint",
      maxlat: bnds.getNorthEast().lat,
      maxlon: bnds.getNorthEast().lng,
      minlat: bnds.getSouthWest().lat,
      minlon: bnds.getSouthWest().lng
    },
    dataType: "json",
    success: function(json, text, jqXHR) {
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
          marker.setIcon(hell.map.mcolors[point.status]);
          hell.map.markergroup.addLayer(marker);
          hell.map.allmarkers[point.id] = marker;
          marker._json = point;
        }
      }
    }
  }).fail(function (jqXHR, textStatus) {
    alert("Произошла ошибка при чтении карты");
  });
  setTimeout(updateMarkers, 300000);// reload every 5 minutes
}