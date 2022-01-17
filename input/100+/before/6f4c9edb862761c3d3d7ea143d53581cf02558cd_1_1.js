function LoadMarkers(data)
{
  var xml = data.responseXML;
  var markersXML = xml.documentElement.getElementsByTagName("marker");
  for (var i = 0; i < markersXML.length; i++)
  {
    var title = markersXML[i].getAttribute("title");
    var set = markersXML[i].getAttribute("set");
    var icon = markersXML[i].getAttribute("icon");
    var coords = new google.maps.LatLng(parseFloat(markersXML[i].getAttribute("lat")),
                                        parseFloat(markersXML[i].getAttribute("lng")));
    var marker = new google.maps.Marker({
      map: map,
      position: coords,
      icon: icon
    });
    markers[i] = new MyMarker(marker,set,title);
    bindInfoWindow(markers[i].marker,map,infoWindow,markersXML[i].childNodes[0].nodeValue);
    if(!document.getElementById('set'+set).checked)
        markers[i].Hide();
  }
    
}