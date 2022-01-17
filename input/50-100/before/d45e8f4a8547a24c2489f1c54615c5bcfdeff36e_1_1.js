function _showPopup(marker, panTo) {
    var latlng = marker.getLatLng();
    var popup = marker._popup.setLatLng(latlng);
    DATA.map.openPopup(popup);
    if (panTo) {
      DATA.map.panTo(latlng);
    }
  }